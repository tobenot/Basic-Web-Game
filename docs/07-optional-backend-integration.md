### **教程：与可选后端集成实现类型自动同步**

本教程将指导您如何配置您的前端项目，以便与一个可选的后端服务实现类型定义的自动同步。这可以显著提升开发体验，尤其是在处理API请求和响应时。

我们提供了一个模板后端项目 [tobenot/Basic-Web-Game-Backend](https://github.com/tobenot/Basic-Web-Game-Backend)，您可以直接使用它，或基于此模板创建自己的后端项目。该后端通过 **GitHub Packages** 发布一个私有的npm包来共享API类型契约。

**🎮 新增：后端功能演示模块**

本模板现在包含一个完整的后端集成演示模块 (`src/games/demo-with-backend`)，展示了如何实现：
- 魔法链接登录
- tRPC类型安全API调用
- JWT令牌管理
- 用户状态管理

您估计会想使用自己的后端项目，请将下文中的所有 `@<您的GitHub用户名>` 替换为您的实际GitHub用户名。

---

## **快速使用指南（前端视角）**

如果您已经熟悉流程，可以直接按照以下步骤操作：

### **🎮 体验后端演示（推荐）**

1. **启动后端服务**：
   ```bash
   # 在 Basic-Web-Game-Backend 项目中
   npm run dev
   ```

2. **访问演示**：
   启动前端开发服务器后，访问 `/demo-with-backend` 路由

3. **体验功能**：
   - 输入邮箱地址
   - 检查邮箱或控制台获取魔法链接
   - 点击链接完成登录
   - 查看用户仪表板

### **🔧 手动集成后端**

1.  **创建 `.npmrc` 文件**：
    在项目根目录添加 `.npmrc` 文件，并包含以下内容：
    ```ini
    @tobenot:registry=https://npm.pkg.github.com/
    //npm.pkg.github.com/:_authToken=您的PAT令牌
    ```
    将 `您的PAT令牌` 替换为您的 GitHub Personal Access Token (PAT)，确保 PAT 至少具有 `read:packages` 权限。

2.  **将 `.npmrc` 添加到 `.gitignore`**：
    避免将包含敏感信息的 `.npmrc` 提交到 Git：
    ```bash
    echo ".npmrc" >> .gitignore
    ```

3.  **安装契约包**：
    安装后端发布的类型包：
    ```bash
    yarn add @tobenot/basic-web-game-backend-contract@latest
    ```

4.  **在代码中使用类型**：
    现在您可以直接从包中导入类型定义：
    ```typescript
    import type { AppRouter } from '@tobenot/basic-web-game-backend-contract';

    // 示例：在 tRPC 或其他 API 客户端中使用
    // const trpc = createTRPCProxyClient<AppRouter>({ ... });
    ```

---


## **详细教程（完整版）**

### **1. 前端仓库配置**

#### **1.1 创建个人访问令牌（PAT）- 用于本地开发**

1.  前往您的 GitHub **Settings** -> **Developer settings** -> **Personal access tokens**。
2.  生成一个新令牌（classic token），并至少勾选 **`read:packages`** 权限。
3.  **立即保存好您的令牌**，因为关闭页面后您将无法再次查看它。

#### **1.2 配置`.npmrc` - 用于本地开发**

在您的前端项目根目录下（与`package.json`同级）创建一个名为 `.npmrc` 的文件。这个文件会告诉Yarn去哪里寻找 `@<您的GitHub用户名>` 作用域下的包，并提供认证。

文件内容如下：
```ini
@<您的GitHub用户名>:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=您的PAT令牌
```
将 `您的PAT令牌` 替换为您在 **步骤 1.1** 中创建的 GitHub Personal Access Token (PAT)。

> **重要提示**: 包含令牌的 `.npmrc` 文件非常敏感。请务必将其添加到 `.gitignore` 文件中，以防止被提交到版本控制中。
> ```bash
> echo ".npmrc" >> .gitignore
> ```

#### **1.3 安装与使用**

一切准备就绪后，使用 `yarn` 安装后端的类型契约包：
```bash
yarn add @<您的GitHub用户名>/basic-web-game-backend-contract@latest
```
现在，您可以在项目的任何地方导入和使用后端定义的类型。

---

### **2. CI/CD 环境配置 (例如 GitHub Actions)**

您的本地 `.npmrc` 文件被 `.gitignore` 忽略，不会提交到仓库，因此在 CI/CD 环境（如 GitHub Actions）中，您需要另一种方式来认证。

我们通过修改 GitHub Actions 工作流文件 `.github/workflows/deploy-pages.yml` 来实现：

```yaml
# .github/workflows/deploy-pages.yml

# ... (其他配置)

permissions:
  contents: read
  pages: write
  id-token: write
  packages: read  # 1. 授予读取包的权限

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'
          registry-url: 'https://npm.pkg.github.com' # 2. 指向 GitHub Packages
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }} # 3. 使用 GITHUB_TOKEN 进行认证
      
      # ... (后续步骤)
```
**关键改动解释**：

1.  **`permissions: packages: read`**: 这行授予了工作流内置的 `GITHUB_TOKEN` 读取您的 GitHub Packages 的权限。
2.  **`registry-url: 'https://npm.pkg.github.com'`**: 在 `setup-node` 步骤中，这行告诉 Node.js 和 Yarn，默认的包注册中心是 GitHub Packages。
3.  **`env: NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`**: 在 `Install dependencies` 步骤中，这行将 `GITHUB_TOKEN` 作为环境变量 `NODE_AUTH_TOKEN` 注入。Yarn/npm 会自动使用这个令牌来向 GitHub Packages 进行身份验证。

通过以上配置，您的自动化工作流现在也能够成功拉取私有包了。

---

### **3. 后端仓库配置（供参考）**

> **注意**：以下是后端仓库 (`Basic-Web-Game-Backend`) 需要进行的配置，以便能够成功发布类型包。作为前端开发人员，您通常不需要执行这些步骤，但了解它们有助于排查问题。

#### **3.1 修改`package.json`**
后端的 `package.json` 需要被配置成一个作用域包，并指向生成的类型文件。
```json
// Backend's package.json
{
	"name": "@<您的GitHub用户名>/basic-web-game-backend-contract",
	"version": "1.0.0",
	"main": "dist/server.js",
	"types": "dist/server.d.ts",
	"files": [
		"dist"
	],
	"scripts": {
		"build": "tsc"
	}
}
```

#### **3.2 调整`tsconfig.json`**
后端的 `tsconfig.json` 必须启用 `declaration` 选项来生成 `.d.ts` 类型声明文件。
```json
// Backend's tsconfig.json
{
	"compilerOptions": {
		"declaration": true,
		"outDir": "dist"
	}
}
```

#### **3.3 创建GitHub Actions工作流**
后端仓库中会有一个GitHub Actions工作流 (`.github/workflows/publish-contract.yml`)，用于在代码推送到 `main` 分支时自动构建和发布包。

```yaml
# Backend's .github/workflows/publish-contract.yml
name: Publish API Contract to GitHub Packages

on:
  push:
    branches: [main]

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@<您的GitHub用户名>'
      - run: yarn install --frozen-lockfile && yarn build
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - run: yarn publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## **🎮 后端演示模块详解**

### **模块结构**

```
src/games/demo-with-backend/
├── components/
│   ├── LoginScreen.tsx    # 登录界面组件
│   └── Dashboard.tsx      # 用户仪表板组件
├── hooks/
│   └── useAuth.ts         # 认证状态管理Hook
├── services/
│   └── trpc.ts           # tRPC客户端配置
├── index.tsx             # 模块入口
└── README.md             # 模块说明文档
```

### **核心功能**

1. **魔法链接登录**：
   - 用户输入邮箱地址
   - 后端发送包含魔法链接的邮件
   - 用户点击链接完成登录

2. **JWT令牌管理**：
   - 自动解析和验证JWT令牌
   - 令牌过期自动清理
   - 登录状态持久化

3. **tRPC集成**：
   - 类型安全的API调用
   - 自动错误处理
   - 完整的TypeScript支持

### **如何移除**

如果不需要后端功能，可以轻松移除：

1. **删除模块**：
   ```bash
   rm -rf src/games/demo-with-backend
   ```

2. **移除路由**：
   在 `src/App.tsx` 中删除相关导入和路由

3. **清理依赖**（可选）：
   ```bash
   npm uninstall @trpc/client
   ```

---

## **总结**
通过这种方式，前后端团队可以解耦，同时保持类型安全：
1.  **后端**：每次推送到`main`分支时，自动发布一个包含最新API类型的新版本包。
2.  **前端**：通过更新 `@<您的GitHub用户名>/basic-web-game-backend-contract` 包来获取最新的类型，从而在开发过程中避免许多常见的API集成错误。

这样，即使后端是可选的，一旦决定集成，我们也能拥有一个顺滑且类型安全的工作流。
