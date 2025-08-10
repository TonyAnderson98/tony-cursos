import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '../../../../lib/services/auth';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, email, password } = body;

		if (!name || !email || !password) {
			return NextResponse.json(
				{
					success: false,
					message: 'Nome, email e senha são obrigatórios',
				},
				{ status: 400 }
			);
		}

		if (password.length < 6) {
			return NextResponse.json(
				{
					success: false,
					message: 'A senha deve ter pelo menos 6 caracteres',
				},
				{ status: 400 }
			);
		}

		const result = await AuthService.register({ name, email, password });

		if (!result.success) {
			return NextResponse.json(
				{ success: false, message: result.message },
				{ status: 400 }
			);
		}

		const response = NextResponse.json(result);

		// Configurar cookie HTTP-only para o token
		response.cookies.set('auth-token', result.token!, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60, // 7 dias
			path: '/',
		});

		return response;
	} catch (error) {
		console.error('Erro na API de registro:', error);
		return NextResponse.json(
			{ success: false, message: 'Erro interno do servidor' },
			{ status: 500 }
		);
	}
}
