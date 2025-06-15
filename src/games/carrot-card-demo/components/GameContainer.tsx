import { useEffect, useState } from 'react';
import { Card as CardType } from '@/games/carrot-card-demo/types';
import { cardService } from '@/games/carrot-card-demo/services/cardService';
import { Card } from '@/games/carrot-card-demo/components/Card';
import { MainMenu } from '@/games/carrot-card-demo/components/MainMenu';
import '../styles/game.css';

export function GameContainer() {
  const [currentCard, setCurrentCard] = useState<CardType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    const initializeGame = async () => {
      try {
        setIsLoading(true);
        await cardService.loadCardData();
        const firstCard = cardService.drawCard();
        setCurrentCard(firstCard);
        setError(null);
      } catch (err) {
        console.error("Failed to initialize game:", err);
        setError("Failed to initialize the game. Please check the configuration or contact the developer.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isGameStarted) {
      initializeGame();
    }
  }, [isGameStarted]);

  const handleChoice = () => {
    // Simplified logic: always draw the next card
    const nextCard = cardService.drawCard();
    if (nextCard) {
      setCurrentCard(nextCard);
    } else {
      setError("No more cards available!");
    }
  };

  const handleGameStart = () => {
    setIsGameStarted(true);
  };

  // The main layout for the game is now defined here.
  return (
    <div className="w-full h-full grid grid-cols-[20fr_60fr_20fr] bg-[#1a1a2e]">
      {!isGameStarted ? (
        <MainMenu onStart={handleGameStart} />
      ) : isLoading ? (
        <div className="game-overlay">
          <h2>Loading...</h2>
          <p>Preparing your adventure...</p>
        </div>
      ) : error ? (
        <div className="game-overlay">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : currentCard ? (
        <Card
          key={currentCard.id}
          card={currentCard}
          onChoice={handleChoice}
        />
      ) : (
        <div className="game-overlay">
          <h2>Game Complete</h2>
          <p>Thank you for playing!</p>
        </div>
      )}
    </div>
  );
} 