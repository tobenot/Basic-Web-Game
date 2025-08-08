# 项目结构（Apps/Packages 布局）

本项目采用物理分层：`apps/*` 放业务/示例应用，`packages/*` 放可复用代码，`configs/*` 放工具链配置，降低冲突并便于选择性更新。

```
/
├── apps/
│   └── web/                 # 主 Web 应用（Vite root）
│       ├── public/
│       ├── src/
│       │   ├── games/       # 示例：carrot-card-demo, demo-with-backend, portal
│       │   └── ...
│       └── index.html
├── packages/
│   ├── ui/                  # 通用 UI 组件（ImageLoader/TypewriterText/GameShell/...）
│   └── services/            # 通用服务（ResourceLoader/...）
├── scripts/
│   ├── build-itch.js        # itch.io 构建打包
│   └── update-from-template.sh # A+ 模板同步脚本（按白名单拷贝）
├── sync.manifest            # 模板托管区白名单
├── vite.config.ts           # 指向 apps/web 为 root，输出 dist 到仓库根
├── tailwind.config.js       # Tailwind 扫描 apps 与 packages
└── docs/
```

导入别名：
- `@` -> `apps/web/src`
- `@ui` -> `packages/ui/src`
- `@services` -> `packages/services/src`

TypeScript `paths` 已覆盖上述别名，并将 `packages/*` 源码纳入 `include`，开箱即用。

A+ 同步策略（可选）：
- 继续手动拷贝也可；
- 或运行 `bash scripts/update-from-template.sh`，按 `sync.manifest` 覆盖模板托管区，冲突范围小、自动做备份。 