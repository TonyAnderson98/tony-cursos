import { useState, useEffect } from 'react';

interface Course {
    course_id: number;
    course_name: string;
    course_description: string;
    created_at: string;
    price: number;
}

export function useCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/courses');
                if (!response.ok) {
                    throw new Error('Falha ao carregar cursos');
                }
                const data = await response.json();
                setCourses(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { courses, loading, error };
}