import { useState, useEffect } from 'react';
import { trpc } from '../services/trpc';
import { isRateLimited, RATE_LIMIT_COOLDOWN_MS, RATE_LIMIT_MESSAGE } from '../services/errors';

interface User {
	userId: string;
}

export const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	// 收到 429 后冷却 30 秒,期间拒绝重发,避免立刻重试继续触发限流
	const [rateLimitedUntil, setRateLimitedUntil] = useState(0);

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

	// 冷却期内直接返回提示,不发请求
	const guardRateLimit = (): string | null => {
		const remaining = rateLimitedUntil - Date.now();
		if (remaining > 0) return `请求过于频繁，请 ${Math.ceil(remaining / 1000)} 秒后再试。`;
		return null;
	};

	// 统一的登录类请求封装:限流冷却守卫 + 429 识别与提示
	const request = async <T>(fn: () => Promise<T>): Promise<{ ok: true; data: T } | { ok: false; error: string }> => {
		const blocked = guardRateLimit();
		if (blocked) return { ok: false, error: blocked };
		try {
			return { ok: true, data: await fn() };
		} catch (error) {
			const limited = isRateLimited(error);
			if (limited) setRateLimitedUntil(Date.now() + RATE_LIMIT_COOLDOWN_MS);
			return { ok: false, error: limited ? RATE_LIMIT_MESSAGE : (error instanceof Error ? error.message : '请求失败') };
		}
	};

	const login = async (email: string) => {
		const result = await request(() => (trpc as any).auth.requestLoginLink.mutate({ email }));
		return result.ok ? { success: true } : { success: false, error: result.error };
	};

	const requestVerificationCode = async (email: string) => {
		const result = await request(() => (trpc as any).auth.requestLoginLink.mutate({ email }));
		if (!result.ok) return { success: false, error: result.error };
		return { success: true, challengeId: (result.data as any).challengeId };
	};

	const verifyCode = async (challengeId: string, code: string) => {
		const result = await request(() => (trpc as any).auth.verifyEmailCode.mutate({ challengeId, code }));
		if (!result.ok) return { success: false, error: result.error };
		const sessionToken = (result.data as any).sessionToken;
		localStorage.setItem('sessionToken', sessionToken);
		setUser({ userId: JSON.parse(atob(sessionToken.split('.')[1])).userId });
		return { success: true };
	};

	const verifyToken = async (token: string) => {
		// mutation:token 走请求体而非 URL,避免落访问日志/Referer/浏览器历史
		const result = await request(() => (trpc as any).auth.verifyMagicToken.mutate({ token }));
		if (!result.ok) return { success: false, error: result.error };
		const sessionToken = (result.data as any).sessionToken;
		localStorage.setItem('sessionToken', sessionToken);
		setUser({ userId: JSON.parse(atob(sessionToken.split('.')[1])).userId });
		return { success: true };
	};

	const logout = () => {
		localStorage.removeItem('sessionToken');
		setUser(null);
	};

	return {
		user,
		isLoading,
		login,
		requestVerificationCode,
		verifyCode,
		verifyToken,
		logout,
	};
};
