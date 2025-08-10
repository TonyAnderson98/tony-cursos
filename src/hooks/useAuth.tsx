'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types/database';

interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: (
		email: string,
		password: string
	) => Promise<{ success: boolean; message: string }>;
	register: (
		name: string,
		email: string,
		password: string
	) => Promise<{ success: boolean; message: string }>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth deve ser usado dentro de um AuthProvider');
	}
	return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [isChecking, setIsChecking] = useState(false);

	useEffect(() => {
		// Verificar se há um usuário logado ao carregar a página
		checkAuthStatus();

		// Verificar token quando a janela ganha foco (usuário volta à aba)
		let focusTimeout: NodeJS.Timeout;
		const handleFocus = () => {
			if (user) {
				// Debounce para evitar múltiplas chamadas
				clearTimeout(focusTimeout);
				focusTimeout = setTimeout(() => {
					checkAuthStatus();
				}, 1000); // Aguardar 1 segundo antes de verificar
			}
		};

		// Verificar token a cada 10 minutos se houver usuário logado
		const interval = setInterval(
			() => {
				if (user) {
					checkAuthStatus();
				}
			},
			10 * 60 * 1000
		); // 10 minutos

		window.addEventListener('focus', handleFocus);

		return () => {
			clearInterval(interval);
			clearTimeout(focusTimeout);
			window.removeEventListener('focus', handleFocus);
		};
	}, []); // Removida dependência do user para evitar loops infinitos

	const checkAuthStatus = async () => {
		// Evitar múltiplas chamadas simultâneas
		if (isChecking) {
			return;
		}

		setIsChecking(true);

		try {
			// Verificar se há um token válido
			const response = await fetch('/api/auth/verify', {
				method: 'GET',
				credentials: 'include', // Incluir cookies
			});

			if (response.ok) {
				const data = await response.json();
				if (data.success && data.user) {
					setUser(data.user);
					localStorage.setItem('user', JSON.stringify(data.user));

					// Se o token foi renovado, atualizar o localStorage
					if (data.tokenRenewed) {
						console.log('Token renovado automaticamente');
					}
				} else {
					// Token inválido, limpar dados
					setUser(null);
					localStorage.removeItem('user');
				}
			} else {
				// Sem token ou token inválido
				setUser(null);
				localStorage.removeItem('user');
			}
		} catch (error) {
			console.error('Erro ao verificar status de autenticação:', error);
			// Em caso de erro, limpar dados para segurança
			setUser(null);
			localStorage.removeItem('user');
		} finally {
			setLoading(false);
			setIsChecking(false);
		}
	};

	const login = async (email: string, password: string) => {
		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (data.success) {
				setUser(data.user);
				localStorage.setItem('user', JSON.stringify(data.user));
				return { success: true, message: data.message };
			} else {
				return { success: false, message: data.message };
			}
		} catch (error) {
			console.error('Erro no login:', error);
			return {
				success: false,
				message: 'Erro ao conectar com o servidor',
			};
		}
	};

	const register = async (name: string, email: string, password: string) => {
		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, email, password }),
			});

			const data = await response.json();

			if (data.success) {
				setUser(data.user);
				localStorage.setItem('user', JSON.stringify(data.user));
				return { success: true, message: data.message };
			} else {
				return { success: false, message: data.message };
			}
		} catch (error) {
			console.error('Erro no registro:', error);
			return {
				success: false,
				message: 'Erro ao conectar com o servidor',
			};
		}
	};

	const logout = async () => {
		try {
			await fetch('/api/auth/logout', { method: 'POST' });
			setUser(null);
			localStorage.removeItem('user');
		} catch (error) {
			console.error('Erro no logout:', error);
		}
	};

	const value = {
		user,
		loading,
		login,
		register,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
