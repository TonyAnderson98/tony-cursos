'use client';

import { useParams } from 'next/navigation';
import { useCourse, Lesson } from "@/hooks/useCourse";
import LessonsTree from '@/app/components/LessonsTree';
import { useMemo, useState } from 'react';

export default function Course() {
    const { course_id } = useParams();
    const { data, isLoading, error } = useCourse(Number(course_id));

    const allLessons = data?.chapters?.flatMap(c => c.lessons) ?? [];
    const [selectedLessonId, setSelectedLessonId] = useState<number | null>(allLessons[0]?.lesson_id ?? null);
    const selectedLesson = allLessons.find(l => l.lesson_id === selectedLessonId) ?? allLessons[0];

    if (isLoading) return <div>Carregando curso...</div>;
    if (error) return <div>Erro ao carregar curso</div>;

    const videoUrl = selectedLesson?.lesson_link
        ? `https://drive.google.com/file/d/${selectedLesson.lesson_link}/preview`
        : null;

    return (
        <div className="space-y-6">
            <header className="space-y-2">
                <h1 className='text-4xl font-bold'>{data?.course_name}</h1>
                <h3 className='text-lg font-semibold'>{data?.course_description}</h3>
            </header>

            <section className='flex gap-4'>
                <div className="w-[1280px] h-[680px] bg-gray-800 flex justify-center items-center">
                    {videoUrl ? (
                        <iframe
                            key={videoUrl}
                            className="w-full h-full"
                            src={videoUrl}
                            title={selectedLesson?.lesson_name}
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <span>Vídeo aqui</span>
                    )}
                </div>

                <aside className='w-[500px] max-h-[700px] overflow-auto border border-gray-600 rounded-lg'>
                    <LessonsTree
                        onSelectLesson={setSelectedLessonId}
                        selectedLessonId={selectedLesson?.lesson_id ?? null}
                    />
                </aside>
            </section>

            <section>
                <h1 className='text-2xl font-semibold'>{selectedLesson?.lesson_name ?? 'Selecione uma aula'}</h1>
                <p className='mt-2 text-gray-300'>{selectedLesson?.lesson_description}</p>
            </section>
        </div>
    );
}