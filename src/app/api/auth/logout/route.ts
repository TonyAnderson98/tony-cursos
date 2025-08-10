import { NextResponse } from 'next/server';

export async function POST() {
	const response = NextResponse.json({
		success: true,
		message: 'Logout realizado com sucesso',
	});

	// Remover o cookie de autenticação
	response.cookies.set('auth-token', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 0,
		path: '/',
	});

	return response;
}
