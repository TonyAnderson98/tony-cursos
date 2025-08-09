'use client';

import { useParams } from 'next/navigation';
import { useCourse, Lesson } from "@/hooks/useCourse";
import LessonsTree from '@/app/components/LessonsTree';
import { useMemo, useState } from 'react';

export default function Course() {
    const params = useParams();
    const course_id = Number(params.course_id);

    const { data, isLoading, error } = useCourse(course_id);
    const allLessons = useMemo(() => data?.chapters?.flatMap(c => c.lessons) ?? [], [data]);
    const [selectedLessonId, setSelectedLessonId] = useState<number | null>(allLessons[0]?.lesson_id ?? null);

    const selectedLesson: Lesson | undefined = useMemo(() => {
        return allLessons.find(l => l.lesson_id === selectedLessonId) ?? allLessons[0];
    }, [allLessons, selectedLessonId]);

    if (isLoading) return (
        <div><span>Carregando curso...</span></div>
    )

    if (error) return (
        <div><span>Erro ao carregar curso</span></div>
    )

    return (
        <>
            <div>
                <header>
                    <h1 className='text-4xl font-bold'>{data?.course_name}</h1>
                    <h3 className='text-lg font-semibold'>{data?.course_description}</h3>
                </header>

                <section className='flex gap-4'>
                    <div className="w-[1280px] h-[680px] bg-gray-800 flex justify-center items-center">
                        {(() => {
                            const id = selectedLesson?.lesson_link; // armazenado no banco apenas o ID
                            if (!id) return <span>Vídeo aqui</span>;
                            const previewUrl = `https://drive.google.com/file/d/${id}/preview`;
                            return (
                                <iframe
                                    key={previewUrl}
                                    className="w-full h-full"
                                    src={previewUrl}
                                    title={selectedLesson?.lesson_name}
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                />
                            );
                        })()}
                    </div>

                    <aside className='w-[500px] max-h-[700px] overflow-auto border border-gray-600 rounded-lg'>
                        <LessonsTree
                            onSelectLesson={(lessonId) => setSelectedLessonId(lessonId)}
                            selectedLessonId={selectedLesson?.lesson_id ?? null}
                        />
                    </aside>
                </section>
            </div>








            <section>
                <h1 className='text-2xl font-semibold'>{selectedLesson?.lesson_name ?? 'Selecione uma aula'}</h1>
                <p className='mt-2 text-gray-300'>{selectedLesson?.lesson_description}</p>
            </section>
        </>
    )
}