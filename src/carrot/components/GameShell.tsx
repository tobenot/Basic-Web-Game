import React from 'react';
import { ScreenOrientationLock } from './ScreenOrientationLock';

interface GameShellProps {
  children: React.ReactNode;
  orientation: 'landscape' | 'portrait';
}

/**
 * A shell component that wraps a game, providing an orientation lock and a
 * fixed 16:9 aspect ratio container.
 */
export const GameShell: React.FC<GameShellProps> = ({
  children,
  orientation,
}) => {
  // These classes enforce a 16:9 aspect ratio.
  const aspectRatioClasses = 'w-screen h-[56.25vw] max-h-screen max-w-[177.78vh]';

  return (
    <>
      <ScreenOrientationLock orientation={orientation} />
      
      {/* Container that enforces the aspect ratio */}
      <div className={`relative ${aspectRatioClasses} my-auto mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white overflow-hidden`}>
        {/* The game content fills the container */}
        <div className="absolute inset-0">
            {children}
        </div>
      </div>
    </>
  );
}; 