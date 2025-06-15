class ResourceLoader {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.BASE_URL;
    console.log(`ResourceLoader initialized with base URL: ${this.baseUrl}`);
  }

  /**
   * 构建一个完整的资源URL，自动处理相对路径和时间戳缓存破坏。
   * @param path - 资源的相对路径 (例如 'config/data.json')
   * @returns {string} - 可直接用于fetch的完整URL
   */
  private buildUrl(path: string): string {
    const url = `${this.baseUrl}${path}`;
    
    // 在开发模式下添加时间戳以防止缓存问题
    if (import.meta.env.DEV) {
      return `${url}?t=${new Date().getTime()}`;
    }
    return url;
  }

  /**
   * 异步加载一个JSON文件。
   * @param path - JSON文件的路径
   * @returns {Promise<T>} - 解析后的JSON对象
   * @template T - 期望的返回类型
   */
  public async loadJSON<T>(path: string): Promise<T> {
    const url = this.buildUrl(path);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch JSON from ${url}: ${response.statusText}`);
      }
      return await response.json() as T;
    } catch (error) {
      console.error(`[ResourceLoader] Error loading JSON from path: ${path}`, error);
      throw error;
    }
  }
}

export const resourceLoader = new ResourceLoader(); 