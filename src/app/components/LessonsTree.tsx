'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useCourse } from '@/hooks/useCourse';
import { FaVideo } from "react-icons/fa";
import { Accordion, AccordionItem } from './Accordion';


export default function LessonsTree() {
    const params = useParams();
    const course_id = Number(params.course_id);
    const { data, isLoading, error } = useCourse(course_id);
    const [openChapter, setOpenChapter] = useState<number | null>(null);

    const toggleChapter = (chapterId: number) => {
        setOpenChapter(openChapter === chapterId ? null : chapterId);
    };

    const handleLessonClick = (lessonId: number) => {
        console.log('Aula clicada:', lessonId);
    };

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

            <Accordion>
                {data?.chapters?.map((chapter) => (
                    <AccordionItem
                        key={chapter.chapter_id}
                        title={chapter.chapter_name}
                        isOpen={openChapter === chapter.chapter_id}
                        onToggle={() => toggleChapter(chapter.chapter_id)}
                    >
                        {chapter.lessons.map((lesson) => (
                            <div
                                key={lesson.lesson_id}
                                onClick={() => handleLessonClick(lesson.lesson_id)}
                                className="p-3 bg-slate-700/50 hover:bg-slate-600 cursor-pointer transition-colors  border-b border-dashed border-slate-500/50"
                            >

                                <div className="grid grid-cols-[auto,1fr,auto] gap-2 items-center w-full">
                                    <div className="w-6 flex justify-center">
                                        <FaVideo className="text-gray-400" />
                                    </div>
                                    <div className="truncate">
                                        <h3 className="font-medium text-gray-100 truncate">{lesson.lesson_name}</h3>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 font-mono">10:23</p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}