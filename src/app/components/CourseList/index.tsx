'use client';

import { useCourses } from '@/hooks/useCourses';
import { useRouter } from 'next/navigation';
import { Course } from '@/types/database';

export function CourseList() {
	const router = useRouter();
	const { courses, loading, error } = useCourses();

	if (loading)
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-pulse text-xl text-slate-300">
					Carregando cursos...
				</div>
			</div>
		);

	if (error)
		return (
			<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
				Erro: {error}
			</div>
		);

	if (!courses || courses.length === 0)
		return (
			<div className="text-center py-8">
				<p className="text-slate-400 text-lg">
					Nenhum curso disponível no momento.
				</p>
			</div>
		);

	return (
		<div className="space-y-8 py-8">
			<h2 className="text-4xl font-bold text-slate-50 text-center mb-8">
				Nossos Cursos
				<span className="block w-24 h-1 bg-blue-500 mx-auto mt-4"></span>
			</h2>

			<div className="flex flex-wrap gap-4 justify-center">
				{courses.map((course: Course) => (
					<div
						key={course.course_id}
						className="relative w-[250px] h-[500px] rounded-sm overflow-hidden hover:scale-105 transition-all duration-300 group hover:cursor-pointer"
						onClick={() =>
							router.push(`/course/${course.course_id}`)
						}
					>
						<img
							src="/cover.png"
							alt={course.course_name}
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
							<h3 className="text-lg font-bold text-white mb-2">
								{course.course_name}
							</h3>
							<p className="text-sm text-slate-200 line-clamp-3 mb-3">
								{course.course_description}
							</p>
							<p className="text-lg font-semibold text-green-400">
								{new Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								}).format(course.price)}
							</p>
							<button className="mt-4 mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
								Saiba mais
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
