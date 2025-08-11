import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { Course } from '@/types/database';

export async function GET() {
	try {
		const result = await db.query(
			'SELECT * FROM courses ORDER BY created_at DESC'
		);

		// Garantir que os dados estão no formato correto
		const courses: Course[] = result.rows.map((row: any) => ({
			course_id: row.course_id,
			course_name: row.course_name,
			course_description: row.course_description,
			price: row.price,
			created_at: row.created_at,
			updated_at: row.updated_at,
		}));

		return NextResponse.json(courses);
	} catch (error) {
		console.error('Error fetching courses:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch courses' },
			{ status: 500 }
		);
	}
}
