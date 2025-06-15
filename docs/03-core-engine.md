# 核心引擎 (`carrot/`)

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

## 核心组件

### `TypewriterText`

一个模拟打字机效果的文本组件。

-   **位置**: `src/carrot/components/TypewriterText.tsx`
-   **用途**: 用于在对话、描述等场景中逐字显示文本，增加沉浸感。
-   **主要 Props**:
    -   `text`: 要显示的完整字符串。
    -   `speed`: 打字速度（毫秒/字符）。
    -   `enabled`: 是否开启动画效果。

### `ImageLoader`

一个能够处理加载、错误和回退状态的图片组件。

-   **位置**: `src/carrot/components/ImageLoader.tsx`
-   **用途**: 优雅地加载图片，在图片加载时显示占位符，在加载失败时显示错误状态或回退图片。
-   **主要 Props**:
    -   `src`: 图片文件名（不含路径和扩展名）。
    -   `alt`: 图片的替代文本。
    -   `basePath`: 图片所在的基础路径 (例如 `/illustrations/`)。
    -   `extension`: 图片的文件扩展名 (默认为 `webp`)。
    -   `fallbackSrc`: 加载失败时使用的回退图片文件名。
    -   `imageClass`, `placeholderClass`, `errorClass`: 用于自定义各状态下样式的 CSS 类。

## 核心服务

### `ResourceLoader`

-   **位置**: `src/carrot/services/ResourceLoader.ts`
-   **用途**: 用于加载游戏数据，例如从 JSON 文件加载场景、角色或配置。
-   **主要方法**:
    -   `loadJson(path)`: 从指定路径加载并解析 JSON 文件。 