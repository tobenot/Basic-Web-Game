import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@tobenot/basic-web-game-backend-contract';

const getBaseUrl = () => {
	console.log('Environment variables for tRPC:', {
		VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
		DEV: import.meta.env.DEV,
		MODE: import.meta.env.MODE,
		window_location_origin: typeof window !== 'undefined' ? window.location.origin : 'undefined'
	});

	if (import.meta.env.VITE_BACKEND_URL) {
		console.log('Using VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);
		return import.meta.env.VITE_BACKEND_URL;
	}
	if (import.meta.env.DEV) {
		console.log('Using localhost:3000 for development');
		return 'http://localhost:3000';
	}
	console.log('Using window.location.origin as fallback');
	return window.location.origin;
};

const baseUrl = getBaseUrl();
console.log('Final tRPC base URL:', baseUrl);

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${baseUrl}/api/trpc`,
			headers() {
				// Read token at call time to reflect latest auth state
				try {
					const token = typeof window !== 'undefined' ? localStorage.getItem('sessionToken') : null;
					return token ? { Authorization: `Bearer ${token}` } : {};
				} catch (e) {
					return {};
				}
			},
		}),
	],
}); 