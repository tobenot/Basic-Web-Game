import { resourceLoader } from '@/carrot/services/ResourceLoader';
import { Card } from '@/games/carrot-card-demo/types';

class CardService {
  private cards: Card[] = [];
  private drawnCards: Card[] = [];

  /**
   * 加载所有在 cardPacks.json 中定义的卡包数据。
   */
  public async loadCardData(): Promise<void> {
    try {
      const packNames = await resourceLoader.loadJSON<string[]>('config/cardPacks.json');
      
      const loadPromises = packNames.map(packName =>
        resourceLoader.loadJSON<Card[]>(`config/cards/${packName}/base.json`)
          .catch(error => {
            console.error(`Failed to load card pack: ${packName}`, error);
            return []; // 如果某个包加载失败，返回空数组，不影响其他包
          })
      );

      const cardArrays = await Promise.all(loadPromises);
      this.cards = cardArrays.flat();
      this.drawnCards = [];
      
      console.log(`Successfully loaded ${this.cards.length} cards from ${packNames.length} packs.`);

    } catch (error) {
      console.error("Could not load card packs config:", error);
      this.cards = [];
    }
  }

  /**
   * 从卡池中随机抽取一张卡。
   * @returns {Card | null} 返回抽到的卡片，如果卡池为空则返回 null。
   */
  public drawCard(): Card | null {
    if (this.cards.length === 0) {
      return null;
    }
    
    // 简单的随机抽卡
    const cardIndex = Math.floor(Math.random() * this.cards.length);
    const drawnCard = this.cards.splice(cardIndex, 1)[0];
    
    if (drawnCard) {
      this.drawnCards.push(drawnCard);
    }
    
    return drawnCard;
  }
}

export const cardService = new CardService(); 