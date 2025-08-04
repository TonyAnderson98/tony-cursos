import { db } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const result = await db.query('SELECT * FROM courses');
        return NextResponse.json(result.rows);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch courses' },
            { status: 500 }
        );
    }
}
