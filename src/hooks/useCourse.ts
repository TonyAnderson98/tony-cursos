import { useState, useEffect } from 'react';

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

export function useCourse(courseId: string) {
	const [course, setCourse] = useState<CourseWithChapters | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			if (!courseId) {
				setError('ID do curso não fornecido');
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				setError(null);

				const response = await fetch(`/api/course/${courseId}`);

				if (!response.ok) {
					if (response.status === 404) {
						throw new Error('Curso não encontrado');
					}
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();

				if (data && typeof data === 'object' && !Array.isArray(data)) {
					setCourse(data);
				} else {
					throw new Error('Formato de dados inválido');
				}
			} catch (err) {
				console.error('Error fetching course:', err);
				setError(
					err instanceof Error
						? err.message
						: 'Erro desconhecido ao carregar o curso'
				);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [courseId]);

	return { course, loading, error };
}
