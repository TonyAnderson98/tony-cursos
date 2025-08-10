import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';

export function middleware(request: NextRequest) {
	// Rotas que não precisam de autenticação
	const publicRoutes = ['/auth/login', '/auth/register', '/'];

	// Verificar se a rota atual é pública
	const isPublicRoute = publicRoutes.some(route =>
		request.nextUrl.pathname.startsWith(route)
	);

	if (isPublicRoute) {
		return NextResponse.next();
	}

	// Verificar token de autenticação
	const token = request.cookies.get('auth-token')?.value;

	if (!token) {
		// Redirecionar para login se não houver token
		return NextResponse.redirect(new URL('/auth/login', request.url));
	}

	// Verificar se o token é válido
	const payload = verifyToken(token);
	if (!payload) {
		// Token inválido, remover cookie e redirecionar para login
		const response = NextResponse.redirect(
			new URL('/auth/login', request.url)
		);
		response.cookies.set('auth-token', '', { maxAge: 0 });
		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};
