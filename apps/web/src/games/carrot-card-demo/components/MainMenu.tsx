import React from 'react';

interface MainMenuProps {
  onStart: () => void;
}

export function MainMenu({ onStart }: MainMenuProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700 overflow-hidden">
      {/* Background texture overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grain' width='100' height='100' patternUnits='userSpaceOnUse'><circle cx='25' cy='25' r='1' fill='rgba(255,255,255,0.1)'/><circle cx='75' cy='75' r='1' fill='rgba(255,255,255,0.1)'/><circle cx='50' cy='10' r='0.5' fill='rgba(255,255,255,0.05)'/></pattern></defs><rect width='100' height='100' fill='url(%23grain)'/></svg>")`
        }}
      ></div>
      
      <div className="relative z-10 text-center text-white max-w-2xl px-12 animate-fade-in">
        <div className="mb-12">
          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
            Carrot Card Adventure
          </h1>
          <p className="text-xl opacity-90 font-light tracking-wide">
            An interactive storytelling experience
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-6">
          <button 
            onClick={onStart} 
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-pink-400 text-white font-semibold text-lg px-10 py-4 rounded-full cursor-pointer transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1 active:translate-y-0 uppercase tracking-wider"
          >
            Begin Your Journey
          </button>
          <p className="text-sm opacity-70 italic">
            Make choices that shape your destiny
          </p>
        </div>
      </div>
    </div>
  );
} 