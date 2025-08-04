'use client';

import Link from 'next/link';

export function Header() {
    const user_name = "Usuário";

    return (
        <header className="bg-slate-800 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-8">
                    <Link
                        href="/"
                        className={`text-lg font-semibold hover:text-blue-300 transition-colors`}
                    >
                        Início
                    </Link>
                </div>

                <nav className="flex items-center space-x-6">
                    <Link
                        href="/sobre"
                        className={`hover:text-blue-300 transition-colors`}
                    >
                        Sobre
                    </Link>

                    <Link
                        href="/contato"
                        className={`hover:text-blue-300 transition-colors`}
                    >
                        Contato
                    </Link>

                    <span className="text-slate-300">Olá, {user_name}</span>

                    <button
                        className="px-3 py-1 rounded transition-colors"
                    >
                        Sair
                    </button>
                </nav>
            </div>
        </header>
    );
}
