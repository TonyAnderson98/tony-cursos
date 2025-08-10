import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, generateToken } from '../../../../lib/jwt';
import sql from '../../../../lib/db';

export async function GET(request: NextRequest) {
	try {
		// Pegar o token do cookie
		const token = request.cookies.get('auth-token')?.value;

		if (!token) {
			return NextResponse.json(
				{ success: false, message: 'Token não fornecido' },
				{ status: 401 }
			);
		}

		// Verificar se o token é válido
		const payload = verifyToken(token);
		if (!payload) {
			return NextResponse.json(
				{ success: false, message: 'Token inválido ou expirado' },
				{ status: 401 }
			);
		}

		// Verificar se o token está próximo de expirar (menos de 1 hora)
		const tokenExp = payload.exp || 0;
		const now = Math.floor(Date.now() / 1000);
		const oneHour = 60 * 60;
		const shouldRenew = tokenExp - now < oneHour;

		// Buscar dados atualizados do usuário no banco
		const { rows } = await sql`
      SELECT user_id, user_name, user_email, user_active, last_login, created_at, updated_at
      FROM users 
      WHERE user_id = ${payload.userId} 
      AND user_active = true
    `;

		if (rows.length === 0) {
			return NextResponse.json(
				{
					success: false,
					message: 'Usuário não encontrado ou inativo',
				},
				{ status: 401 }
			);
		}

		const user = rows[0];

		// Se o token deve ser renovado, gerar um novo
		let newToken = null;
		if (shouldRenew) {
			newToken = generateToken({
				userId: user.user_id,
				email: user.user_email,
			});
		}

		const response = NextResponse.json({
			success: true,
			message: 'Token válido',
			user: {
				user_id: user.user_id,
				user_name: user.user_name,
				user_email: user.user_email,
				user_active: user.user_active,
				last_login: user.last_login,
				created_at: user.created_at,
				updated_at: user.updated_at,
			},
			tokenRenewed: !!newToken,
		});

		// Se um novo token foi gerado, atualizar o cookie
		if (newToken) {
			response.cookies.set('auth-token', newToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 7 * 24 * 60 * 60, // 7 dias
				path: '/',
			});
		}

		return response;
	} catch (error) {
		console.error('Erro ao verificar token:', error);
		return NextResponse.json(
			{ success: false, message: 'Erro interno do servidor' },
			{ status: 500 }
		);
	}
}
