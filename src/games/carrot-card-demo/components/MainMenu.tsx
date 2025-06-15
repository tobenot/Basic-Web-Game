import React from 'react';

interface MainMenuProps {
  onStart: () => void;
}

export function MainMenu({ onStart }: MainMenuProps) {
  return (
    <div className="main-menu-container">
      <div className="main-menu-content">
        <div className="main-menu-header">
          <h1 className="main-menu-title">Carrot Card Adventure</h1>
          <p className="main-menu-subtitle">An interactive storytelling experience</p>
        </div>
        
        <div className="main-menu-actions">
          <button onClick={onStart} className="main-menu-start-btn">
            Begin Your Journey
          </button>
          <p className="main-menu-hint">
            Make choices that shape your destiny
          </p>
        </div>
      </div>
    </div>
  );
} 