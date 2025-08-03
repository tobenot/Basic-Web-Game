# 后端集成指南

## 前端现状

我们正在开发一个基于React + TypeScript的前端游戏项目，需要与后端进行集成。目前遇到了一些连接问题，需要后端配合解决。

## 当前问题

### 1. 404 Not Found 错误
```
Failed to load resource: the server responded with a status of 404 (Not Found)
/api/trpc/auth.requestLoginLink?batch=1:1
```

### 2. JSON解析错误
```
Failed to execute 'json' on 'Response': Unexpected end of JSON input
```

### 3. tRPC类型不匹配
TypeScript编译时出现tRPC类型不兼容的错误。

## 前端配置

### 依赖版本
- `@trpc/client`: ^11.4.3
- `@tobenot/basic-web-game-backend-contract`: ^1.0.0

### API端点
前端期望的后端API端点：
- `GET /api/trpc/auth.healthCheck` (健康检查)
- `POST /api/trpc/auth.requestLoginLink` (请求登录链接)
- `POST /api/trpc/auth.verifyMagicToken` (验证魔法令牌)
- `GET /api/trpc/user.getMe` (获取用户信息)

### 请求格式
tRPC批量请求格式：
```json
{
  "0": {
    "json": {
      "email": "user@example.com"
    }
  }
}
```

## 需要后端配合的事项

### 1. 确认API端点
请确认后端是否提供了以下端点：
- `/api/trpc/auth.healthCheck` (POST) - 健康检查
- `/api/trpc/auth.requestLoginLink` (POST) - 请求登录链接
- `/api/trpc/auth.verifyMagicToken` (POST) - 验证魔法令牌
- `/api/trpc/user.getMe` (GET) - 获取用户信息

### 2. 检查CORS配置
前端运行在 `http://localhost:5173`，需要后端允许跨域请求：
```javascript
// 后端CORS配置示例
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

### 3. 验证tRPC配置
确保后端tRPC配置正确：
```javascript
// 后端tRPC配置
const appRouter = router({
  auth: authRouter,
  user: userRouter,
  // ... 其他路由
});

export type AppRouter = typeof appRouter;
```

### 4. 检查响应格式
tRPC期望的响应格式：
```json
{
  "result": {
    "data": {
      "success": true
    }
  }
}
```

## 测试步骤

### 1. 启动后端服务
```bash
cd Basic-Web-Game-Backend
npm run dev
```

### 2. 测试API端点
```bash
# 测试健康检查
curl -X GET http://localhost:3000/api/trpc/auth.healthCheck \
  -H "Content-Type: application/json"

# 测试登录链接请求
curl -X POST http://localhost:3000/api/trpc/auth.requestLoginLink \
  -H "Content-Type: application/json" \
  -d '{"0":{"json":{"email":"test@example.com"}}}'
```

### 3. 检查前端连接
访问 `http://localhost:5173/demo-with-backend` 查看连接状态。

## 调试信息

### 前端调试
- 打开浏览器开发者工具
- 查看Console和Network标签页
- 页面会显示后端连接状态指示器

### 后端调试
- 检查服务器日志
- 确认端口3000是否被占用
- 验证tRPC路由是否正确注册

## 联系信息

如果遇到问题，请检查：
1. 后端服务是否正常运行在端口3000
2. API端点是否正确配置
3. CORS设置是否允许前端域名
4. tRPC版本是否与前端兼容

## 预期结果

成功集成后，用户应该能够：
1. 在登录页面输入邮箱
2. 收到魔法链接（开发环境下在控制台显示）
3. 点击链接完成登录
4. 看到用户仪表板

---

**注意**：这是一个演示模块，用于展示前后端集成的完整流程。如果不需要后端功能，可以轻松移除整个模块。 