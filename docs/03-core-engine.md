# 可复用层（packages/*）

原先的 `src/carrot/` 已迁移至 `packages/*`：
- 组件位于 `packages/ui/`
- 服务位于 `packages/services/`

### 服务（`packages/services`）

#### `ResourceLoader.ts`

一个通用资源加载器，用于加载 JSON（可扩展到图片/音频等）。

使用方法:
```typescript
import { resourceLoader } from '@services/ResourceLoader';

const config = await resourceLoader.loadJSON<YourConfigType>('config/game.json');
```

### 组件（`packages/ui`）

#### `TypewriterText.tsx`

实现打字机效果的 React 组件。

使用方法:
```tsx
import { TypewriterText } from '@ui/TypewriterText';

<TypewriterText text="这是将要逐字显示的文本。" />
```

### `ImageLoader`

优雅加载图片，处理加载、错误和回退。
- 位置: `packages/ui/src/ImageLoader.tsx`
- 主要 Props: `src`, `alt`, `basePath`, `extension`, `fallbackSrc`, `imageClass` 等

### `GameShell`

屏幕方向锁定与固定宽高比的外壳组件。
- 位置: `packages/ui/src/GameShell.tsx`
- Props: `orientation: 'landscape' | 'portrait'`, `children`

### `ScreenOrientationLock`

被 `GameShell` 内部使用，通常无需直接引用。

### `ResourceLoader` API
- 位置: `packages/services/src/ResourceLoader.ts`
- 方法: `loadJSON(path)` 从路径加载并解析 JSON 文件。 