export interface Choice {
  text: string;
  description?: string;
}

export interface Card {
  id: string;
  name: string;
  type: 'event'; // 模板中只保留一种类型
  description: string;
  illustration?: string;
  choices: Choice[];
} 