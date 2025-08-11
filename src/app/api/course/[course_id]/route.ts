import db from '@/lib/db';
import { NextResponse } from 'next/server';

interface CourseWithChapters {
	course_id: number;
	course_name: string;
	course_description: string;
	price: number;
	chapters: Array<{
		chapter_id: number;
		chapter_name: string;
		lessons: Array<{
			lesson_id: number;
			lesson_name: string;
			lesson_description: string;
			lesson_link?: string;
			created_at: string;
			updated_at: string;
		}>;
	}>;
}

export async function GET(
	request: Request,
	{ params }: { params: { course_id: string } }
) {
	try {
		const { course_id } = params;

		// Validação do course_id
		if (!course_id || isNaN(Number(course_id))) {
			return NextResponse.json(
				{ error: 'Invalid course ID' },
				{ status: 400 }
			);
		}

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
				{ error: 'Course not found' },
				{ status: 404 }
			);
		}

		const course = courseResult.rows[0];

		// 2. Busca os capítulos com suas aulas
		const chaptersResult = await db.query(
			`SELECT 
                c.chapter_id,
                c.chapter_name,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'lesson_id', l.lesson_id,
                            'lesson_name', l.lesson_name,
                            'lesson_description', l.lesson_description,
                            'lesson_link', l.lesson_link,
                            'created_at', l.created_at,
                            'updated_at', l.updated_at
                        ) ORDER BY l.created_at
                    ) FILTER (WHERE l.lesson_id IS NOT NULL),
                    '[]'::json
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

		const courseData: CourseWithChapters = {
			course_id: course.course_id,
			course_name: course.course_name,
			course_description: course.course_description,
			price: course.price,
			chapters: chaptersResult.rows,
		};

		return NextResponse.json(courseData);
	} catch (error) {
		console.error('Error fetching course data:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
