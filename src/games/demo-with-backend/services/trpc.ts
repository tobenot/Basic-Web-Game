import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@tobenot/basic-web-game-backend-contract';

const getBaseUrl = () => {
	if (import.meta.env.VITE_BACKEND_URL) {
		return import.meta.env.VITE_BACKEND_URL;
	}
	if (import.meta.env.DEV) {
		return 'http://localhost:3000';
	}
	return window.location.origin;
};

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${getBaseUrl()}/api/trpc`,
		}),
	],
}); 