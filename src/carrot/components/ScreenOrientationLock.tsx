import React from 'react';

interface ScreenOrientationLockProps {
  /**
   * The desired screen orientation.
   */
  orientation: 'landscape' | 'portrait';
  /**
   * Custom message to display.
   */
  message?: string;
}

/**
 * A component that displays an overlay asking the user to rotate their device
 * if the screen orientation does not match the desired one.
 */
export const ScreenOrientationLock: React.FC<ScreenOrientationLockProps> = ({
  orientation,
  message,
}) => {
  if (orientation === 'landscape') {
    const defaultMessage = '请旋转设备至横屏模式以获得最佳体验';
    return (
      <div className="portrait:flex hidden fixed inset-0 z-[9999] items-center justify-center bg-black text-white text-center p-4">
        {message || defaultMessage}
      </div>
    );
  }

  if (orientation === 'portrait') {
    const defaultMessage = '请将设备旋转至竖屏模式以获得最佳体验';
    return (
      <div className="landscape:flex hidden fixed inset-0 z-[9999] items-center justify-center bg-black text-white text-center p-4">
        {message || defaultMessage}
      </div>
    );
  }

  return null;
}; 