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

## 构建与部署

本模板提供了一套完善的脚本，用于开发、构建和本地测试。

### 开发服务器

在开发过程中，您应该使用 Vite 的热更新服务器。它提供了最佳的开发体验。

```bash
npm run dev
```

### 生产构建

`package.json` 中定义了多种构建命令：

*   `npm run build`: 执行标准的生产构建，输出到 `dist` 目录。
*   `npm run build:itch`: 专门为 [itch.io](https://itch.io/) 等平台优化的构建。它会在标准构建后，执行 `scripts/post-build.js` 脚本，将资源路径从绝对路径 (`/assets/`) 修改为相对路径 (`./assets/`)，以确保游戏在非根目录下也能正常运行。
*   `npm run build:pages`: 专门为 GitHub Pages 部署的构建。
*   `npm run deploy`: 使用 `gh-pages` 包将 `dist` 目录的内容部署到 GitHub Pages。

### 本地测试生产构建

当您直接在浏览器中通过 `file://` 协议打开构建后的 `index.html` 文件时，会遇到浏览器的同源策略（CORS）限制，导致无法加载 JSON 等外部资源。

为了在上传前模拟真实的服务器环境，您可以使用 `start_game.ps1` 脚本。

```powershell
.\start_game.ps1
```

此脚本会：
1.  在项目根目录的 `8000` 端口启动一个轻量级的 HTTP 服务器。
2.  自动在您的默认浏览器中打开 `http://localhost:8000`。
3.  通过 `http://` 协议访问，可以避免跨域问题，让您能够完整地测试生产构建包的功能。

脚本还提供了简单的交互功能：
*   在控制台输入 `q` 并回车，可以停止服务器。
*   输入 `r` 并回车，可以重启服务器（在重启前会尝试运行 `dev-tool/encrypt_files.ps1` 脚本）。

### 自动化部署 (CI/CD)

本项目包含一个预置的 GitHub Actions 工作流 (`.github/workflows/deploy-pages.yml`)，用于自动将您的游戏部署到 GitHub Pages。

**工作原理:**
*   当您向 `main` 或 `master` 分支推送代码时，此工作流会自动触发。
*   它会执行 `build:pages` 脚本来构建项目。
*   构建成功后，它会将 `dist` 目录下的内容自动部署到您的 GitHub Pages。

**如何使用:**
1.  确保您的仓库已经开启了 GitHub Pages 功能（在 `Settings` -> `Pages` 中，将 `Source` 设置为 `GitHub Actions`）。
2.  将您的代码推送到 `main` 分支。
3.  稍等片刻，GitHub Actions 完成后，您的游戏就会在 GitHub Pages 网址上生效。

这个自动化流程取代了原有的 `npm run deploy` 手动部署方式，让部署过程更可靠、更高效。

## 贡献指南

我们欢迎任何形式的贡献！如果您有兴趣为这个项目添砖加瓦，无论是修复 Bug、提出新功能建议，还是帮助完善文档，都请先阅读我们的 [贡献指南](./.github/CONTRIBUTING.md)。

该指南详细说明了如何提交代码、报告问题以及进行文档更新，遵循这些规范将有助于我们更好地协作。 