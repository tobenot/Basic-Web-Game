import React from 'react';
import { Card as CardType } from '@/games/carrot-card-demo/types';
import { TypewriterText } from '@/carrot/components/TypewriterText';
import { ImageLoader } from '@/carrot/components/ImageLoader';

interface CardProps {
  card: CardType;
  onChoice: () => void;
}

export const Card: React.FC<CardProps> = ({ card, onChoice }) => {
  return (
    <div className="absolute inset-0 flex flex-col bg-gradient-to-br from-slate-700 to-slate-800 text-white overflow-hidden animate-fade-in">
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-slate-600 to-slate-700">
        <ImageLoader
          src={card.illustration || card.id}
          fallbackSrc="default"
          basePath="/illustrations/"
          alt={card.name}
          imageClass="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-8 bg-black/80 backdrop-blur-sm border-t border-white/10">
        <h2 className="text-3xl font-bold mb-4 text-gray-100 text-center">{card.name}</h2>
        <div className="text-lg leading-relaxed mb-8 text-gray-300 text-center max-w-2xl mx-auto">
          <TypewriterText text={card.description} enabled={true} />
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          {card.choices.map((choice: any, index: number) => (
            <button
              key={index}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white px-6 py-3 rounded-full cursor-pointer text-base font-medium transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 active:translate-y-0 min-w-[150px]"
              onClick={() => onChoice()}
              title={choice.description}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 