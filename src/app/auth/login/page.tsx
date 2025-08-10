export default function Login() {
	return (
		<div className="min-h-screen flex items-center justify-center  p-4">
			<div className="w-full max-w-md">
				<div className="mb-10 text-center">
					<svg
						className="mx-auto h-12 w-12 text-indigo-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
						/>
					</svg>
					<h2 className="mt-6 text-3xl font-extrabold text-white">
						Bem vindo de volta!
					</h2>
					<p className="mt-2 text-sm text-gray-400">
						Faça login na sua conta
					</p>
				</div>

				<div className="bg-gray-800/50 rounded-2xl p-8 shadow-xl border border-gray-700/50">
					<form action="#" method="post" className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-300 mb-1"
							>
								Email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-white placeholder-gray-400 transition-all duration-200 outline-none"
								placeholder="seu@email.com"
							/>
						</div>

						<div>
							<div className="flex items-center justify-between mb-1">
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-300"
								>
									Senha
								</label>
								<a
									href="#"
									className="text-sm text-indigo-400 hover:text-indigo-300"
								>
									Esqueceu a sua senha?
								</a>
							</div>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-white placeholder-gray-400 transition-all duration-200 outline-none"
								placeholder="* * * * * *"
							/>
						</div>

						<div>
							<button
								type="submit"
								className="w-full flex justify-center py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-indigo-500/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
							>
								Entrar
							</button>
						</div>
					</form>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-700" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-gray-800/50 text-gray-400">
									Ou
								</span>
							</div>
						</div>

						<div className="mt-6">
							<button
								type="button"
								className="w-full inline-flex justify-center py-2 px-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 border border-gray-600 text-gray-300 font-medium transition-all duration-200"
							>
								<svg
									className="w-5 h-5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M23.7663 12.2764C23.7663 11.4607 23.7001 10.6406 23.559 9.83807H12.2402V14.4591H18.722C18.453 15.9494 17.5888 17.2678 16.3233 18.1056V21.1039H20.1903C22.4611 19.0139 23.7663 15.9274 23.7663 12.2764Z"
										fill="#4285F4"
									/>
									<path
										d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z"
										fill="#34A853"
									/>
									<path
										d="M5.50277 14.3003C4.99987 12.8099 4.99987 11.1961 5.50277 9.70575V6.61481H1.51674C-0.185266 10.0056 -0.185266 14.0004 1.51674 17.3912L5.50277 14.3003Z"
										fill="#FBBC04"
									/>
									<path
										d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z"
										fill="#EA4335"
									/>
								</svg>{' '}
								<span className="ml-4">Entrar com Google</span>
							</button>
						</div>
					</div>
				</div>

				<p className="mt-8 text-center text-sm text-gray-400">
					Não tem uma conta?{' '}
					<a
						href="#"
						className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
					>
						crie uma conta
					</a>
				</p>
			</div>
		</div>
	);
}
