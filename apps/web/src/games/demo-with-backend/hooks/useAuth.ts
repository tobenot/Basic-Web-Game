import { useState, useEffect } from 'react';
import { trpc } from '../services/trpc';

interface User {
	userId: string;
}

export const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem('sessionToken');
		if (token) {
			try {
				const payload = JSON.parse(atob(token.split('.')[1]));
				if (payload.exp * 1000 > Date.now()) {
					setUser({ userId: payload.userId });
				} else {
					localStorage.removeItem('sessionToken');
				}
			} catch (error) {
				localStorage.removeItem('sessionToken');
			}
		}
		setIsLoading(false);
	}, []);

	const login = async (email: string) => {
		try {
			await (trpc as any).auth.sendMagicLink.mutate({ email });
			return { success: true };
		} catch (error) {
			return { success: false, error: error instanceof Error ? error.message : '登录失败' };
		}
	};

	const verifyToken = async (token: string) => {
		try {
			const result = await (trpc as any).auth.verifyToken.query({ token });
			localStorage.setItem('sessionToken', result.sessionToken);
			const payload = JSON.parse(atob(result.sessionToken.split('.')[1]));
			setUser({ userId: payload.userId });
			return { success: true };
		} catch (error) {
			return { success: false, error: error instanceof Error ? error.message : '验证失败' };
		}
	};

	const logout = () => {
		localStorage.removeItem('sessionToken');
		setUser(null);
	};

	return {
		user,
		isLoading,
		login,
		verifyToken,
		logout,
	};
}; 