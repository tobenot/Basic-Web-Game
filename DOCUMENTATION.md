# Carrot Web 游戏模板文档

欢迎使用 Carrot Web 游戏模板！本文档将帮助您理解项目结构、核心引擎功能，并指导您如何基于此模板创建自己的游戏。

## 目录

- [Carrot Web 游戏模板文档](#carrot-web-游戏模板文档)
  - [目录](#目录)
  - [项目结构](#项目结构)
  - [核心引擎 (`carrot/`)](#核心引擎-carrot)
    - [服务 (`services/`)](#服务-services)
      - [`ResourceLoader.ts`](#resourceloaderts)
    - [组件 (`components/`)](#组件-components)
      - [`TypewriterText.tsx`](#typewritertexttsx)
  - [如何创建新游戏](#如何创建新游戏)
  - [示例游戏：Carrot Card Demo](#示例游戏carrot-card-demo)

## 项目结构

本项目采用模块化的方式组织代码，核心逻辑与具体游戏实现分离，便于维护和扩展。

```
/
├── public/             # 存放静态资源，如图片、字体、配置文件等
│   └── game-config.json # 示例游戏配置文件
├── src/                # 项目源码
│   ├── assets/         # 全局资源
│   ├── carrot/         # 核心引擎/模板
│   │   ├── components/ # 可复用的通用UI组件
│   │   ├── services/   # 核心服务 (例如，资源加载)
│   │   ├── types/      # 引擎的TypeScript类型定义
│   │   └── ...
│   ├── games/          # 存放所有具体游戏项目
│   │   └── carrot-card-demo/  # 示例卡牌游戏
│   │       ├── components/    # 游戏特有的React组件
│   │       ├── services/      # 游戏特有的服务
│   │       └── types/         # 游戏特有的TypeScript类型定义
│   ├── styles/         # 全局样式
│   ├── App.tsx         # 应用主组件，用于集成和显示游戏
│   └── main.tsx        # 应用入口点
├── README.md           # 项目简介和快速上手指南
└── DOCUMENTATION.md    # (本文档) 详细的项目文档
```

## 核心引擎 (`carrot/`)

`src/carrot/` 目录包含了游戏的核心功能和可复用模块。

### 服务 (`services/`)

#### `ResourceLoader.ts`

这是一个通用的资源加载器，可以方便地加载游戏所需的各种资源。目前，它主要用于加载 JSON 文件，但可以轻松扩展以支持图片、音频等其他资源。

**使用方法:**
```typescript
import { ResourceLoader } from '@/src/carrot/services/ResourceLoader';

const config = await ResourceLoader.loadJson<YourConfigType>('/game-config.json');
```

### 组件 (`components/`)

#### `TypewriterText.tsx`

一个实现了打字机效果的 React 组件。它会逐个字符地显示传入的文本，常用于对话、叙事等场景。

**使用方法:**
```tsx
import TypewriterText from '@/src/carrot/components/TypewriterText';

<TypewriterText text="这是将要逐字显示的文本。" />
```

## 如何创建新游戏

遵循以下步骤来创建您自己的游戏：

1.  **创建游戏目录**:
    在 `src/games/` 目录下创建一个新的文件夹，例如 `my-new-game`。

2.  **构建游戏组件**:
    在 `my-new-game` 目录中，创建 `components`、`services`、`types` 等子目录。您的游戏主视图组件（例如 `GameContainer.tsx`）将放在 `components` 中。

3.  **定义游戏逻辑和类型**:
    在您自己的 `services` 和 `types` 中定义游戏的核心逻辑和数据结构。

4.  **集成到应用**:
    打开 `src/App.tsx`，修改导入的组件，使其指向您的新游戏的主组件。

    ```tsx
    // import Game from './games/carrot-card-demo/components/GameContainer';
    import Game from './games/my-new-game/components/GameContainer'; // <-- 修改这里

    function App() {
        return (
            <div className="App">
                <Game />
            </div>
        );
    }

    export default App;
    ```

## 示例游戏：Carrot Card Demo

`src/games/carrot-card-demo/` 是一个基于本模板实现的简单卡牌决策游戏。您可以参考它的代码来理解如何：

*   组织游戏组件 (`Card.tsx`, `MainMenu.tsx`)。
*   定义游戏数据结构 (`types/index.ts`)。
*   加载游戏配置和内容。
*   管理游戏状态。 