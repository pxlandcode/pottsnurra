export type AppToasts = {
	id: string;
	type: 'success' | 'cancel' | 'note';
	message: string;
	description?: string;
	timeout?: number;
};
