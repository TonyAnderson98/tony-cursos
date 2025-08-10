import sql from '../db';
import { verifyPassword, hashPassword } from '../auth';
import { generateToken } from '../jwt';
import { User } from '../../types/database';

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterData {
	name: string;
	email: string;
	password: string;
}

export interface AuthResponse {
	success: boolean;
	message: string;
	token?: string;
	user?: Omit<User, 'user_password_hash'>;
}

export class AuthService {
	static async login(credentials: LoginCredentials): Promise<AuthResponse> {
		try {
			const { rows } = await sql`
        SELECT * FROM users 
        WHERE user_email = ${credentials.email} 
        AND user_active = true
      `;

			if (rows.length === 0) {
				return {
					success: false,
					message: 'Email ou senha incorretos',
				};
			}

			const user = rows[0] as User;
			const isValidPassword = await verifyPassword(
				credentials.password,
				user.user_password_hash
			);

			if (!isValidPassword) {
				return {
					success: false,
					message: 'Email ou senha incorretos',
				};
			}

			// Atualizar último login
			await sql`
        UPDATE users 
        SET last_login = CURRENT_TIMESTAMP 
        WHERE user_id = ${user.user_id}
      `;

			const token = generateToken({
				userId: user.user_id,
				email: user.user_email,
			});

			const { user_password_hash, ...userWithoutPassword } = user;

			return {
				success: true,
				message: 'Login realizado com sucesso',
				token,
				user: userWithoutPassword,
			};
		} catch (error) {
			console.error('Erro no login:', error);
			return {
				success: false,
				message: 'Erro interno do servidor',
			};
		}
	}

	static async register(data: RegisterData): Promise<AuthResponse> {
		try {
			// Verificar se o email já existe
			const { rows: existingUsers } = await sql`
        SELECT user_id FROM users WHERE user_email = ${data.email}
      `;

			if (existingUsers.length > 0) {
				return {
					success: false,
					message: 'Email já está em uso',
				};
			}

			// Hash da senha
			const hashedPassword = await hashPassword(data.password);

			// Inserir novo usuário
			const { rows } = await sql`
        INSERT INTO users (user_name, user_email, user_password_hash)
        VALUES (${data.name}, ${data.email}, ${hashedPassword})
        RETURNING *
      `;

			const newUser = rows[0] as User;
			const token = generateToken({
				userId: newUser.user_id,
				email: newUser.user_email,
			});

			const { user_password_hash, ...userWithoutPassword } = newUser;

			return {
				success: true,
				message: 'Usuário criado com sucesso',
				token,
				user: userWithoutPassword,
			};
		} catch (error) {
			console.error('Erro no registro:', error);
			return {
				success: false,
				message: 'Erro interno do servidor',
			};
		}
	}
}
