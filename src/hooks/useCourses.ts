import { useState, useEffect } from 'react';
import { Course } from '@/types/database';

export function useCourses() {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await fetch('/api/courses');
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();

				if (Array.isArray(data)) {
					setCourses(data);
				} else {
					throw new Error('Formato de dados inválido');
				}
			} catch (err) {
				console.error('Error fetching courses:', err);
				setError(
					err instanceof Error
						? err.message
						: 'Erro desconhecido ao carregar cursos'
				);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return { courses, loading, error };
}
