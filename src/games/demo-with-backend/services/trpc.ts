import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@tobenot/basic-web-game-backend-contract';

const getBaseUrl = () => {
	return import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
};

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${getBaseUrl()}/api/trpc`,
		}),
	],
}); 