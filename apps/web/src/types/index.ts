export interface Card {
  id: string;
  name: string;
  type: string;
  cardSet: string;
  description: string;
  requireTags?: Record<string, string>;
  baseWeight: number;
  weightMultipliers?: {
    [key: string]: number;
  };
  mustDraw?: boolean;
  priority?: number;
  timeConsumption?: number;
  dateRestrictions?: {
    after?: string;
    before?: string;
    between?: [string, string];
  };
  choices: Choice[];
  illustration?: string;
  autoSelect?: boolean;
}

export interface Choice {
  text: string;
  effects: string[];
  description?: string;
  requireTags?: Record<string, string>;
  consumeCard?: boolean;
  specialMechanism?: string;
  disabledDisplay?: string;
  skipContinue?: boolean;
}

export interface Tag {
  value?: number;
  priority?: number;
  color?: string;
  [key: string]: any;
}

export interface TagConfig {
  color?: string;
  priority?: number;
  description?: string;
  type?: string;
  defaultValue: number | string;
  effects?: string[] | Record<string, number>;
  slot?: string;
}

interface ItemConfig extends TagConfig {
  type: 'consumable' | 'equipment';
  slot?: '头部' | '身体' | '武器';
  effects?: Record<string, number> | string[];
  description?: string;
}

export interface TagsConfig {
  状态: Record<string, TagConfig>;
  位置: Record<string, TagConfig>;
  物品: Record<string, ItemConfig>;
  装备: Record<string, TagConfig>;
}

export interface CharacterTags {
  状态: Record<string, any>;
  位置: {
    当前地点: string;
    目标地点: string;
  };
  装备: Record<string, any>;
  物品: Record<string, any>;
  属性: Record<string, any>;
  技能: Record<string, any>;
  [key: string]: any;
}

export type PlayerTags = CharacterTags;

export interface Countdown {
  name: string;
  date: Date;
}

export interface TagModifier {
  value: number;
}

export interface TagModifierConfig {
  [key: string]: TagModifier | TagModifierConfig;
}

export interface SpecialMechanism {
  [key: string]: (choice: Choice, card: Card) => void;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  description: string;
  faction: string;
  tags: CharacterTags;
  relationships: {
    [characterId: string]: {
      好感度: number;
      信任度: number;
      立场: string;
    }
  };
}

export interface GameState {
  isGameOver: boolean;
  endingStats?: {
    ending: string;
    totalTurns: number;
    [key: string]: any;
  };
}
 