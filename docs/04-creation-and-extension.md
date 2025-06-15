# 创建与扩展

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