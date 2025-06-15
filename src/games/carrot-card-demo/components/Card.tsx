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
    <div className="card-container">
      <div className="card-illustration">
        <ImageLoader
          src={card.illustration || card.id}
          fallbackSrc="default"
          basePath="/illustrations/"
          alt={card.name}
          imageClass="h-full w-full object-cover"
        />
      </div>
      <div className="card-content">
        <h2 className="card-name">{card.name}</h2>
        <div className="card-description">
          <TypewriterText text={card.description} enabled={true} />
        </div>
        <div className="card-choices">
          {card.choices.map((choice: any, index: number) => (
            <button
              key={index}
              className="choice-button"
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