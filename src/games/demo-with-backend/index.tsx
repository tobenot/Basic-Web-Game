import React from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { DebugInfo } from './components/DebugInfo';
import { useAuth } from './hooks/useAuth';
import { GameShell } from '../../carrot/components/GameShell';

export const DemoWithBackend: React.FC = () => {
	const { user, isLoading } = useAuth();

	// 添加环境变量调试信息
	React.useEffect(() => {
		console.log('DemoWithBackend Environment Variables:', {
			VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
			VITE_PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL,
			BASE_URL: import.meta.env.BASE_URL,
			MODE: import.meta.env.MODE,
			DEV: import.meta.env.DEV,
			window_location_origin: window.location.origin,
			window_location_href: window.location.href
		});
	}, []);

	if (isLoading) {
		return (
			<GameShell orientation="landscape">
				<div className="flex items-center justify-center h-full">
					<div className="text-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
						<p className="text-gray-600">正在加载...</p>
					</div>
				</div>
				<DebugInfo />
			</GameShell>
		);
	}

	return (
		<GameShell orientation="landscape">
			{user ? <Dashboard /> : <LoginScreen />}
			<DebugInfo />
		</GameShell>
	);
}; 