# 4. 创建与扩展

本模板的核心设计理念是模块化，您可以轻松创建自己的游戏并与核心引擎分离。

## 创建一个新游戏

以下是创建一个全新游戏（例如，一个叫 `my-new-game` 的项目）的步骤。

### 1. 复制游戏目录

复制 `src/games/carrot-card-demo` 目录，并将其重命名为您新游戏的名称，例如 `src/games/my-new-game`。

### 2. 开发游戏逻辑

在新创建的目录中，您可以自由地修改或替换组件、服务和类型定义，以实现您的游戏逻辑。

-   **主容器**: 您的游戏应该有一个主容器组件（类似于 `GameContainer.tsx`），作为游戏的入口点。

### 3. 在应用中注册游戏

最后一步是让您的应用知道这个新游戏的存在。这需要在 `src/App.tsx` 文件中进行配置。

1.  **导入游戏主容器**:
    ```tsx
    import { MyNewGameContainer } from './games/my-new-game/components/MyNewGameContainer';
    ```

2.  **添加新路由**: 在 `<Routes>` 中，为您的游戏添加一个新的 `<Route>`。

    ```tsx
    <Routes>
        <Route path="/" element={<Portal />} />
        <Route path="/carrot-card-demo" /* ... */ />
        
        {/* 在这里添加您的新游戏路由 */}
        <Route path="/my-new-game" element={<MyNewGameContainer />} />
    </Routes>
    ```

### 4. (可选) 配置屏幕方向

如果您的游戏需要特定的屏幕方向（例如横屏），您可以使用核心组件 `GameShell` 来包裹它。

1.  **导入 `GameShell`**:
    ```tsx
    import { GameShell } from '@ui/GameShell';
    ```

2.  **包裹您的路由**:
    ```tsx
    <Route 
        path="/my-new-game" 
        element={
            <GameShell orientation="landscape">
                <MyNewGameContainer />
            </GameShell>
        } 
    />
    ```
    -   `orientation` 可以是 `'landscape'` (横屏) 或 `'portrait'` (竖屏)。
    -   如果您**不希望**有任何屏幕方向或宽高比的限制，**请不要使用** `GameShell` 包裹。

完成这些步骤后，您就可以通过访问 `/#/my-new-game` 来进入您的新游戏了。

## 示例游戏：Carrot Card Demo

`src/games/carrot-card-demo/` 是一个基于本模板实现的简单卡牌决策游戏。您可以参考它的代码来理解如何：

*   组织游戏组件 (`Card.tsx`, `MainMenu.tsx`)。
*   定义游戏数据结构 (`types/index.ts`)。
*   加载游戏配置和内容。
*   管理游戏状态。 