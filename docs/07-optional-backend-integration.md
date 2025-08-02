### **教程：与可选后端集成实现类型自动同步**

本教程将指导您如何配置您的前端项目，以便与一个可选的后端服务实现类型定义的自动同步。这可以显著提升开发体验，尤其是在处理API请求和响应时。

我们提供了一个模板后端项目 [tobenot/Basic-Web-Game-Backend](https://github.com/tobenot/Basic-Web-Game-Backend)，您可以直接使用它，或基于此模板创建自己的后端项目。该后端通过 **GitHub Packages** 发布一个私有的npm包来共享API类型契约。

您估计会想使用自己的后端项目，请将下文中的所有 `@<您的GitHub用户名>` 替换为您的实际GitHub用户名。

---

## **快速使用指南（前端视角）**

如果您已经熟悉流程，可以直接按照以下步骤操作：

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
    npm install @tobenot/basic-web-game-backend-contract@latest
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

#### **1.1 创建个人访问令牌（PAT）**

1.  前往您的 GitHub **Settings** -> **Developer settings** -> **Personal access tokens**。
2.  生成一个新令牌（classic token），并至少勾选 **`read:packages`** 权限。
3.  **立即保存好您的令牌**，因为关闭页面后您将无法再次查看它。

#### **1.2 配置`.npmrc`**

在您的前端项目根目录下（与`package.json`同级）创建一个名为 `.npmrc` 的文件。这个文件会告诉npm去哪里寻找 `@<您的GitHub用户名>` 作用域下的包。

文件内容如下：
```
@<您的GitHub用户名>:registry=https://npm.pkg.github.com/
```

#### **1.3 登录到GitHub Packages**

打开您的终端，运行以下命令以登录到 GitHub Packages。这将把您的凭证保存在本地，以便将来 `npm install` 时使用。

```bash
npm login --scope=@<您的GitHub用户名> --registry=https://npm.pkg.github.com
```

当提示时，请输入：
*   **Username**: 您的GitHub用户名。
*   **Password**: 您刚刚创建的 **Personal Access Token (PAT)** (注意，不是您的GitHub密码)。
*   **Email**: 您的GitHub账户关联的邮箱。

#### **1.4 安装契约包**

一切准备就绪后，像安装任何其他npm包一样安装后端的类型契约包：
```bash
npm install @<您的GitHub用户名>/basic-web-game-backend-contract@latest
```
`@latest` 标签可以确保您总是获取最新版本的类型定义。

#### **1.5 在代码中使用类型**

现在，您可以在项目的任何地方导入和使用后端定义的类型，享受完整的IDE自动补全和类型检查。

```typescript
// src/services/api.ts
import type { AppRouter } from '@<您的GitHub用户名>/basic-web-game-backend-contract';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

// 这是一个使用tRPC的示例，但类型可以用于任何HTTP客户端
export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:3000', // 您的后端地址
		}),
	],
});

// 现在您可以安全地调用后端过程
// const user = await trpc.user.get.query({ id: '1' });
// `user` 将拥有完整的类型信息
```

---

### **2. 后端仓库配置（供参考）**

> **注意**：以下是后端仓库 (`Basic-Web-Game-Backend`) 需要进行的配置，以便能够成功发布类型包。作为前端开发人员，您通常不需要执行这些步骤，但了解它们有助于排查问题。

#### **2.1 修改`package.json`**
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

#### **2.2 调整`tsconfig.json`**
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

#### **2.3 创建GitHub Actions工作流**
后端仓库中会有一个GitHub Actions工作流 (`.github/workflows/publish-contract.yml`)，用于在代码推送到 `main` 分支时自动构建和发布npm包。

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
      - run: npm ci && npm run build
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## **总结**
通过这种方式，前后端团队可以解耦，同时保持类型安全：
1.  **后端**：每次推送到`main`分支时，自动发布一个包含最新API类型的新版本包。
2.  **前端**：通过更新 `@<您的GitHub用户名>/basic-web-game-backend-contract` 包来获取最新的类型，从而在开发过程中避免许多常见的API集成错误。

这样，即使后端是可选的，一旦决定集成，我们也能拥有一个顺滑且类型安全的工作流。
