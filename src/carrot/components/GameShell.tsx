import React from 'react';
import { ScreenOrientationLock } from './ScreenOrientationLock';

interface GameShellProps {
	children: React.ReactNode;
	orientation: 'landscape' | 'portrait';
}

export const GameShell: React.FC<GameShellProps> = ({
	children,
	orientation,
}) => {
	return (
		<>
			<ScreenOrientationLock orientation={orientation} />
			
			<div className="fixed inset-0 flex items-center justify-center bg-black">
				<div className="w-full h-full max-w-[177.78vh] max-h-screen">
					{children}
				</div>
			</div>
		</>
	);
}; 