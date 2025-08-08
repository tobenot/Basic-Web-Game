# 模板同步（A+ 工作流）

该方案保持“手动为主，脚本兜底”：
- 仍可手动对比/拷贝文件；
- 提供 `scripts/update-from-template.sh`，按 `sync.manifest` 白名单覆盖模板托管区，并把被覆盖内容备份至 `.template_backups/<timestamp>`。

## 准备

项目根可放置 `.template-source`（可选）：
```
TEMPLATE_REPO=https://your.host/your-template.git
TEMPLATE_REF=main
MANIFEST_FILE=sync.manifest
```

白名单（在模板仓库维护）：`sync.manifest`，示例：
```
configs/
packages/ui/
packages/services/
scripts/
apps/web/tailwind.config.js
.editorconfig
.eslintrc.cjs
postcss.config.js
tailwind.config.js
tsconfig.json
vite.config.ts
README.md
docs/
```

## 使用

在你项目根目录：
```bash
bash scripts/update-from-template.sh
```
- 自动克隆模板的 `main`；
- 仅同步清单中的路径；
- 覆盖前会备份本地对应路径。

## 回填模板

在任意项目中若改动了模板托管区：
- 将对应文件拷回模板仓库相同路径；
- 在模板仓库写入 CHANGELOG 并打 tag；
- 其他项目按需同步（手动或脚本）。