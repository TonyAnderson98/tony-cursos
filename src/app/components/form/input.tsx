interface InputProps {
	type?: string;
	id?: string;
	name?: string;
	placeholder?: string;
	required?: boolean;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
	type,
	id,
	name,
	placeholder,
	required,
	value,
	onChange,
}: InputProps) {
	return (
		<>
			<input
				type={type ?? 'text'}
				id={id}
				name={name}
				placeholder={placeholder ?? ''}
				required={required ?? false}
				value={value}
				onChange={onChange}
				className="w-full rounded-lg px-4 py-3 bg-gray-700/50 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 outline-none transition-all transition-300 mt-1 mb-2"
			/>
		</>
	);
}
