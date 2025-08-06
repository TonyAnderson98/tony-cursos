'use client';

import { useParams } from 'next/navigation';
import { useCourse } from "@/hooks/useCourse";
import LessonsTree from '@/app/components/lessonsTree';

export default function Course() {
    const params = useParams();
    const course_id = Number(params.course_id);

    const { data, isLoading, error } = useCourse(course_id);

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
                        Vídeo aqui
                    </div>

                    <aside className='w-[400px] max-h-[700px] overflow-auto border border-gray-600 rounded-lg'>
                        <LessonsTree />
                    </aside>
                </section>
            </div>

            <section>
                <h1>Título da aula escrita</h1>
                <ul>
                    <li>Morbi in sem quis dui placerat ornare.</li>
                    <li>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue.</li>
                    <li>Phasellus ultrices nulla quis nibh. Quisque a lectus.</li>
                    <li>Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut.</li>
                </ul>


            </section>
        </>
    )
}