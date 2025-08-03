import React from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { useAuth } from './hooks/useAuth';
import { GameShell } from '../../carrot/components/GameShell';

export const DemoWithBackend: React.FC = () => {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return (
			<GameShell orientation="landscape">
				<div className="flex items-center justify-center h-full">
					<div className="text-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
						<p className="text-gray-600">正在加载...</p>
					</div>
				</div>
			</GameShell>
		);
	}

	return (
		<GameShell orientation="landscape">
			{user ? <Dashboard /> : <LoginScreen />}
		</GameShell>
	);
}; 