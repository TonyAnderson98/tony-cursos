export type PaymentMethod = 'pix' | 'boleto' | 'credit' | 'debit' | 'free';
export type PaymentStatus = 'approved' | 'failed' | 'pending';

export interface User {
	user_id: number;
	user_name: string;
	user_email: string;
	user_password_hash: string;
	user_active: boolean;
	last_login: Date;
	created_at: Date;
	updated_at: Date;
}

export interface Course {
	course_id: number;
	course_name: string;
	course_description: string;
	price: number;
	created_at: Date;
	updated_at: Date;
}

export interface Chapter {
	chapter_id: number;
	course_id: number;
	chapter_name: string;
}

export interface Lesson {
	lesson_id: number;
	chapter_id: number;
	lesson_name: string;
	lesson_description: string;
	created_at: Date;
	updated_at: Date;
}

export interface Transaction {
	transaction_id: number;
	user_id: number;
	transaction_date: Date;
	amount: number;
	payment_method: PaymentMethod;
	status: PaymentStatus;
	created_at: Date;
}

export interface FavoriteLesson {
	user_id: number;
	lesson_id: number;
	added_date: Date;
}

export interface CompletedLesson {
	lesson_id: number;
	user_id: number;
	completion_date: Date;
}

export interface PurchasedCourse {
	course_id: number;
	user_id: number;
	transaction_id: number;
	purchase_date: Date;
}
