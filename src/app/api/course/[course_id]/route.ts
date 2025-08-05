import { db } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { course_id: string } }) {
    try {
        const { course_id } = await params;

        const result = await db.query('SELECT * FROM courses WHERE course_id = $1', [course_id]);

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching course:', error);
        return NextResponse.json(
            { error: 'Failed to fetch course' },
            { status: 500 }
        );
    }
}