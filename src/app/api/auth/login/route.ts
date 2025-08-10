import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '../../../../lib/services/auth';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { email, password } = body;

		if (!email || !password) {
			return NextResponse.json(
				{ success: false, message: 'Email e senha são obrigatórios' },
				{ status: 400 }
			);
		}

		const result = await AuthService.login({ email, password });

		if (!result.success) {
			return NextResponse.json(
				{ success: false, message: result.message },
				{ status: 401 }
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
		console.error('Erro na API de login:', error);
		return NextResponse.json(
			{ success: false, message: 'Erro interno do servidor' },
			{ status: 500 }
		);
	}
}
