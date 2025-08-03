import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@tobenot/basic-web-game-backend-contract';

const getBaseUrl = () => {
	if (typeof window !== 'undefined') {
		return window.location.origin;
	}
	return process.env.VITE_BACKEND_URL || 'http://localhost:3000';
};

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${getBaseUrl()}/api/trpc`,
			fetch: (url, options) => {
				return fetch(url, {
					...options,
					headers: {
						...options?.headers,
						'Content-Type': 'application/json',
					},
				});
			},
		}),
	],
}); 