import React from 'react';
import { Card as CardType } from '@/games/carrot-card-demo/types';
import { illustrationService } from '@/games/carrot-card-demo/services/illustrationService';
import { TypewriterText } from '@/carrot/components/TypewriterText';

interface CardProps {
  card: CardType;
  onChoice: () => void;
}

export const Card: React.FC<CardProps> = ({ card, onChoice }) => {
  const [illustrationUrl, setIllustrationUrl] = React.useState('');

  React.useEffect(() => {
    const fetchIllustration = async () => {
      const url = await illustrationService.getCardIllustration(card);
      setIllustrationUrl(url);
    };
    fetchIllustration();
  }, [card]);

  return (
    <div className="card-container">
      {illustrationUrl && (
        <div className="card-illustration">
          <img src={illustrationUrl} alt={card.name} />
        </div>
      )}
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