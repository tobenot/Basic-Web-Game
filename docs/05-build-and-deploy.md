# 构建与部署

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