// src/components/LessonsTree.tsx

'use client';

import { useParams } from 'next/navigation';
import { useCourse } from '@/hooks/useCourse';

export default function LessonsTree() {
    const params = useParams();
    const course_id = Number(params.course_id);

    const { data, isLoading, error } = useCourse(course_id);


    if (isLoading) {
        return <p className="p-4 text-gray-700">Carregando dados do curso...</p>;
    }

    if (error) {
        return (
            <p className="p-4 text-red-600">
                Ocorreu um erro ao carregar o curso: {error.message}
            </p>
        );
    }



    return (
        <div className="space-y-6 p-4">
            <div>
                <h1 className="text-2xl font-bold">Aulas</h1>
            </div>

            <div>
                {data?.chapters?.map((chapter) => (
                    <div key={chapter.chapter_id}>
                        <h2 className="font-bold text-xl mb-2">{chapter.chapter_name}</h2>

                        <ul className="space-y-1 ml-12 list-disc text-gray-400 font-light">
                            {chapter.lessons.map((lesson) => (
                                <li key={lesson.lesson_id}>
                                    <div>
                                        <strong>{lesson.lesson_name}</strong>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
