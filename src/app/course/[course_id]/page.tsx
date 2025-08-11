'use client';

import { useParams } from 'next/navigation';
import { useCourse } from '@/hooks/useCourse';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useState } from 'react';

/**
 * Página do curso usando Material UI Accordion para listar capítulos e aulas
 * - Accordion: Expande/colapsa cada capítulo
 * - List: Lista as aulas dentro de cada capítulo
 */
export default function CoursePage() {
	const params = useParams();
	const courseId = params.course_id as string;
	const { course, loading, error } = useCourse(courseId);
	const [selectedLessonId, setSelectedLessonId] = useState<number | null>(
		null
	);

	const handleLessonClick = (lessonId: number) => {
		setSelectedLessonId(lessonId);
		console.log('Aula selecionada:', lessonId);
		// Aqui você pode adicionar lógica para carregar o vídeo da aula
	};

	if (loading)
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-pulse text-xl text-slate-300">
					Carregando curso...
				</div>
			</div>
		);

	if (error)
		return (
			<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
				Erro: {error}
			</div>
		);

	if (!course)
		return (
			<div className="text-center py-8">
				<p className="text-slate-400 text-lg">Curso não encontrado.</p>
			</div>
		);

	return (
		<div className="container mx-auto px-4">
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-slate-50">
					{course.course_name}
				</h1>
				<p className="text-lg text-slate-300 mb-2">
					{course.course_description}
				</p>
			</div>

			<main className="flex flex-col lg:flex-row gap-6">
				<div className="flex-1">
					{selectedLessonId ? (
						(() => {
							const selectedLesson = course.chapters
								.flatMap(chapter => chapter.lessons || [])
								.find(
									lesson =>
										lesson.lesson_id === selectedLessonId
								);

							if (selectedLesson && selectedLesson.lesson_link) {
								return (
									<iframe
										src={`https://drive.google.com/file/d/${selectedLesson.lesson_link}/preview`}
										className="w-full h-[400px] lg:h-[640px] border border-gray-600 rounded-lg"
										allow="autoplay"
										title={selectedLesson.lesson_name}
									/>
								);
							}

							return (
								<div className="w-full h-[400px] lg:h-[640px] bg-black border border-gray-600 rounded-lg flex items-center justify-center">
									<div className="text-white text-center">
										<p className="text-lg mb-2">
											Vídeo do curso
										</p>
										<p className="text-sm text-gray-400">
											Selecione uma aula para começar
										</p>
									</div>
								</div>
							);
						})()
					) : (
						<div className="w-full h-[400px] lg:h-[640px] bg-black border border-gray-600 rounded-lg flex items-center justify-center">
							<div className="text-white text-center">
								<p className="text-lg mb-2">Vídeo do curso</p>
								<p className="text-sm text-gray-400">
									Selecione uma aula para começar
								</p>
							</div>
						</div>
					)}

					{/* Detalhes da aula selecionada */}
					{selectedLessonId &&
						(() => {
							const selectedLesson = course.chapters
								.flatMap(chapter => chapter.lessons || [])
								.find(
									lesson =>
										lesson.lesson_id === selectedLessonId
								);

							if (selectedLesson) {
								return (
									<section className="flex flex-row justify-between">
										<div className="mt-4">
											<h2 className="text-2xl font-bold text-white">
												{selectedLesson.lesson_name}
											</h2>
											<p className="text-slate-300 text-lg leading-relaxed">
												{
													selectedLesson.lesson_description
												}
											</p>
										</div>
										<div className="flex gap-3 py-4">
											<button className="px-3 py-1.5 bg-slate-700/30 hover:bg-slate-700/50 text-slate-200 font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 border border-slate-600/30 hover:border-slate-600/50 text-sm">
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M5 13l4 4L19 7"
													/>
												</svg>
												Concluir
											</button>
											<button className="px-3 py-1.5 bg-slate-700/30 hover:bg-slate-700/50 text-slate-200 font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 border border-slate-600/30 hover:border-slate-600/50 text-sm">
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
													/>
												</svg>
												Favoritar
											</button>
											<button className="px-3 py-1.5 bg-slate-700/30 hover:bg-slate-700/50 text-slate-200 font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 border border-slate-600/30 hover:border-slate-600/50 text-sm">
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
													/>
												</svg>
												Baixar material
											</button>
										</div>
									</section>
								);
							}
							return null;
						})()}
				</div>

				<div className="w-full lg:w-[500px]">
					<div className="rounded-lg p-4 border border-gray-600">
						<h3 className="text-xl font-semibold text-white mb-4">
							Conteúdo do Curso
						</h3>
						<div className="space-y-1">
							{course.chapters.map((chapter, index) => (
								<Accordion key={chapter.chapter_id}>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls={`chapter-${index}-content`}
										id={`chapter-${index}-header`}
										sx={{
											backgroundColor: '#334155', // slate-700
											'&:hover': {
												backgroundColor: '#475569', // slate-600
											},
											'&.Mui-expanded': {
												backgroundColor: '#475569', // slate-600
											},
										}}
									>
										<h4 className="text-white font-medium text-base">
											{chapter.chapter_name}
										</h4>
									</AccordionSummary>
									<AccordionDetails sx={{ padding: 0 }}>
										{chapter.lessons &&
										chapter.lessons.length > 0 ? (
											<List sx={{ padding: 0 }}>
												{chapter.lessons.map(lesson => {
													const isActive =
														selectedLessonId ===
														lesson.lesson_id;
													return (
														<ListItem
															key={
																lesson.lesson_id
															}
															onClick={() =>
																handleLessonClick(
																	lesson.lesson_id
																)
															}
															sx={{
																cursor: 'pointer',
																backgroundColor:
																	isActive
																		? '#475569'
																		: '#334155',
																color: isActive
																	? '#93c5fd'
																	: '#f1f5f9',
																margin: 0,
																padding:
																	'8px 12px',
																'&:hover': {
																	backgroundColor:
																		isActive
																			? '#475569'
																			: '#475569',
																},
															}}
														>
															<ListItemIcon>
																<PlayCircleOutlineIcon
																	sx={{
																		color: isActive
																			? '#93c5fd'
																			: '#9ca3af',
																		fontSize:
																			'1.2rem',
																	}}
																/>
															</ListItemIcon>
															<ListItemText
																primary={
																	lesson.lesson_name
																}
																secondary={
																	lesson.lesson_description
																}
																sx={{
																	'& .MuiListItemText-primary':
																		{
																			color: isActive
																				? '#93c5fd'
																				: '#f1f5f9',
																		},
																	'& .MuiListItemText-secondary':
																		{
																			color: isActive
																				? '#93c5fd'
																				: '#94a3b8',
																		},
																}}
															/>
															<div className="ml-2">
																<span
																	className={`text-sm font-mono ${
																		isActive
																			? 'text-blue-300'
																			: 'text-gray-400'
																	}`}
																>
																	10:23
																</span>
															</div>
														</ListItem>
													);
												})}
											</List>
										) : (
											<p className="text-slate-400 text-sm italic p-3">
												Nenhuma aula disponível neste
												capítulo.
											</p>
										)}
									</AccordionDetails>
								</Accordion>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
