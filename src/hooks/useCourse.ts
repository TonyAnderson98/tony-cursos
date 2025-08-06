// src/hooks/useCourse.ts

import { useEffect, useState } from "react";

interface Lesson {
    lesson_id: number;
    lesson_name: string;
    lesson_description: string;
    created_at: string;
    updated_at: string;
}

interface Chapter {
    chapter_id: number;
    chapter_name: string;
    lessons: Lesson[];
}

interface CourseData {
    course_id: number;
    course_name: string;
    course_description: string;
    price: number;
    chapters?: Chapter[];
}

export function useCourse(course_id: number) {
    const [data, setData] = useState<CourseData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!course_id) {
            setIsLoading(false);
            setError(new Error("ID do curso inválido"));
            return;
        }

        const controller = new AbortController();

        const fetchCourse = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/course/${course_id}`, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(
                        `Erro ao buscar os dados do curso: ${response.status}`
                    );
                }

                const responseData = await response.json();

                if (!responseData || !responseData.course_id) {
                    throw new Error(
                        "Estrutura de dados inválida recebida da API"
                    );
                }

                const normalizedData: CourseData = {
                    ...responseData,
                    chapters: Array.isArray(responseData.chapters)
                        ? responseData.chapters
                        : [],
                };

                setData(normalizedData);
                setError(null);
            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") {
                    console.log("Requisição cancelada");
                    return;
                }
                console.error("Erro ao buscar os dados:", err);
                setError(
                    err instanceof Error ? err : new Error("Erro desconhecido")
                );
                setData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourse();

        return () => {
            controller.abort(); // Evita chamadas pendentes ao desmontar
        };
    }, [course_id]);

    return {
        data,
        isLoading,
        error,
        lessons: data?.chapters?.flatMap((chapter) => chapter.lessons) || [],
    };
}
