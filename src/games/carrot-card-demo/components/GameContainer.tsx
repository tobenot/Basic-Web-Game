import { useEffect, useState } from 'react';
import { Card as CardType } from '@/games/carrot-card-demo/types';
import { cardService } from '@/games/carrot-card-demo/services/cardService';
import { Card } from '@/games/carrot-card-demo/components/Card';
import { MainMenu } from '@/games/carrot-card-demo/components/MainMenu';

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
        setError("游戏初始化失败，请检查配置或联系开发者。");
      } finally {
        setIsLoading(false);
      }
    };

    if (isGameStarted) {
      initializeGame();
    }
  }, [isGameStarted]);

  const handleChoice = () => {
    // 简化逻辑：总是抽下一张卡
    const nextCard = cardService.drawCard();
    if (nextCard) {
      setCurrentCard(nextCard);
    } else {
      setError("没有更多卡牌了！");
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
        <div className="fixed inset-0 bg-neutral-dark/80 flex justify-center items-center text-white z-50">正在加载...</div>
      ) : error ? (
        <div className="fixed inset-0 bg-neutral-dark/80 flex flex-col justify-center items-center text-white z-50">{error}</div>
      ) : currentCard ? (
        <Card
          key={currentCard.id}
          card={currentCard}
          onChoice={handleChoice}
        />
      ) : (
        <div className="fixed inset-0 bg-neutral-dark/80 flex flex-col justify-center items-center text-white z-50">游戏结束</div>
      )}
    </div>
  );
} 