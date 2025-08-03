# tRPC 版本兼容性指南

## 问题描述

前端项目遇到了 tRPC 版本不兼容的问题，导致类型错误和 API 通信失败。

## 当前状态

### 前端依赖版本
```json
{
  "@trpc/client": "^11.4.3",
  "@tobenot/basic-web-game-backend-contract": "^1.0.0"
}
```

### 错误信息
```
Type 'BuiltRouter<...>' does not satisfy the constraint 'Router<any, any>'
The types of '_def.lazy' are incompatible between these types
```

## 最佳实践解决方案

### 方案一：统一使用 tRPC v11（推荐）

**前端已准备就绪**，使用最新的 tRPC v11。建议后端也升级到 v11，这样可以：

1. **获得最新功能**：tRPC v11 提供了更好的类型安全性和性能
2. **长期维护**：v11 是当前活跃维护的版本
3. **生态系统兼容**：与最新的 TypeScript 和其他工具更好地集成

**后端升级步骤**：
```bash
# 升级 tRPC 相关依赖
npm install @trpc/server@^11.4.3 @trpc/client@^11.4.3
npm install @trpc/react-query@^11.4.3  # 如果使用 React Query
```

### 方案二：前端降级到 v10（临时方案）

如果后端暂时无法升级，前端可以降级到 v10：

```bash
npm install @trpc/client@^10.45.0
```

**注意**：这只是临时解决方案，建议尽快升级到 v11。

## 需要后端配合的具体事项

### 1. 确认当前版本
请后端团队确认当前使用的 tRPC 版本：
```bash
npm list @trpc/server
npm list @trpc/client
```

### 2. 升级到 v11（推荐）
如果后端当前使用 v10，建议升级到 v11：

**package.json 更新**：
```json
{
  "dependencies": {
    "@trpc/server": "^11.4.3",
    "@trpc/client": "^11.4.3"
  }
}
```

**代码更新**：
- 检查是否有废弃的 API
- 更新路由定义语法（如果有变化）
- 测试所有现有功能

### 3. 共享类型定义
确保 `@tobenot/basic-web-game-backend-contract` 包中的类型定义与后端实际实现一致：

```typescript
// 后端应该导出的类型
export type AppRouter = typeof appRouter;
```

### 4. API 端点确认
确认以下端点正确实现：
- `GET /api/trpc/auth.healthCheck`
- `POST /api/trpc/auth.requestLoginLink`
- `POST /api/trpc/auth.verifyMagicToken`
- `GET /api/trpc/user.getMe`

### 5. CORS 配置
确保后端允许前端域名的跨域请求：
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

## 测试步骤

### 1. 版本兼容性测试
```bash
# 后端启动后，前端测试连接
curl -X GET http://localhost:3000/api/trpc/auth.healthCheck
```

### 2. 类型检查
```bash
# 前端运行类型检查
npm run build
```

### 3. 端到端测试
1. 启动后端服务
2. 启动前端开发服务器
3. 访问 `/demo-with-backend` 页面
4. 测试邮件登录功能

## 时间安排建议

### 短期（1-2天）
- 确认当前版本
- 决定升级策略
- 开始升级工作

### 中期（3-5天）
- 完成升级
- 测试所有功能
- 更新文档

### 长期
- 建立版本同步机制
- 定期更新依赖
- 自动化测试

## 联系信息

如有问题，请检查：
1. 后端服务是否正常运行
2. API 端点是否正确配置
3. CORS 设置是否允许前端域名
4. tRPC 版本是否与前端兼容

---

**重要提醒**：建议采用方案一（升级到 v11），这样可以确保长期的技术债务最小化，并获得最新的功能和安全性改进。 