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