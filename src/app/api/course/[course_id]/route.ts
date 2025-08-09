import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { course_id: string } }
) {
    try {
        const { course_id } = await params;

        // 1. Busca os dados básicos do curso
        const courseResult = await db.query(
            `SELECT 
                course_id, 
                course_name, 
                course_description,
                price
             FROM 
                courses 
             WHERE 
                course_id = $1`,
            [course_id]
        );

        if (courseResult.rows.length === 0) {
            return NextResponse.json(
                { error: "Course not found" },
                { status: 404 }
            );
        }

        const course = courseResult.rows[0];

        // 2. Busca os capítulos com suas aulas
        const chaptersResult = await db.query(
            `SELECT 
                c.chapter_id,
                c.chapter_name,
                json_agg(
                    json_build_object(
                        'lesson_id', l.lesson_id,
                        'lesson_name', l.lesson_name,
                        'lesson_description', l.lesson_description,
                        'lesson_link', l.lesson_link,
                        'created_at', l.created_at,
                        'updated_at', l.updated_at
                    ) ORDER BY l.created_at
                ) as lessons
             FROM 
                chapters c
             LEFT JOIN 
                lessons l ON c.chapter_id = l.chapter_id
             WHERE 
                c.course_id = $1
             GROUP BY 
                c.chapter_id, c.chapter_name
             ORDER BY 
                c.chapter_id`,
            [course_id]
        );

        return NextResponse.json({
            course_id: course.course_id,
            course_name: course.course_name,
            course_description: course.course_description,
            price: course.price,
            chapters: chaptersResult.rows,
        });
    } catch (error) {
        console.error("Error fetching course data:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
