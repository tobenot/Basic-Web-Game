import { Card } from '@/games/demo-game/types';

class IllustrationService {
  private readonly BASE_PATH = `${import.meta.env.BASE_URL}illustrations/`;
  private readonly DEFAULT_ILLUSTRATION = 'default.webp';

  /**
   * 获取卡片的插图URL。
   * @param card - 卡片对象
   * @returns {Promise<string>} - 插图的完整URL
   */
  public async getCardIllustration(card: Card): Promise<string> {
    const illustrationId = card.illustration || card.id;
    const path = `${this.BASE_PATH}${illustrationId}.webp`;

    try {
      // 检查图片是否存在，如果不存在则使用默认图片
      const response = await fetch(path, { method: 'HEAD' });
      if (response.ok) {
        return path;
      }
      return `${this.BASE_PATH}${this.DEFAULT_ILLUSTRATION}`;
    } catch {
      return `${this.BASE_PATH}${this.DEFAULT_ILLUSTRATION}`;
    }
  }
}

export const illustrationService = new IllustrationService(); 