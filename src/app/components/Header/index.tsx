'use client';
import Link from 'next/link';
import { useAuth } from '../../../hooks/useAuth';

export default function Header() {
	const { user, logout } = useAuth();

	const handleLogout = async () => {
		await logout();
	};

	return (
		<header className="bg-zinc-900 border-b border-zinc-800 shadow-lg sticky top-0 z-50 mb-8">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<Link href="/">
						<span className="text-xl font-bold">Tony Cursos</span>
					</Link>

					<nav className="flex items-center justify-between space-x-8">
						<Link
							href="/cursos"
							className="font-medium hover:text-slate-400 transition-color duration-200"
						>
							Cursos
						</Link>

						<Link
							href="/sobre"
							className="font-medium hover:text-slate-400 transition-color duration-200"
						>
							Sobre
						</Link>

						<Link
							href="/contato"
							className="font-medium hover:text-slate-400 transition-color duration-200"
						>
							Contato
						</Link>

						{user ? (
							<div className="flex items-center space-x-4">
								<span className="text-gray-300">
									Olá, {user.user_name}
								</span>
								<button
									onClick={handleLogout}
									className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
								>
									Sair
								</button>
							</div>
						) : (
							<Link
								href="/auth/login"
								className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
							>
								Entrar
							</Link>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
}
