# 后端功能演示模块

这个模块演示了如何在前端项目中集成后端服务，包括用户认证、API调用等功能。

## 功能特性

- 🔐 **魔法链接登录**：无需密码，通过邮箱链接登录
- 🛡️ **JWT令牌管理**：自动处理认证状态和令牌刷新
- 📡 **tRPC集成**：类型安全的API调用
- 📱 **响应式设计**：适配各种设备尺寸
- ⚡ **实时状态管理**：用户登录状态实时同步

## 快速开始

### 1. 启动后端服务

确保你的后端服务正在运行：
```bash
# 在Basic-Web-Game-Backend项目中
npm run dev
```

后端服务默认运行在 `http://localhost:3000`

### 2. 测试后端连接

运行测试脚本检查后端连接状态：
```bash
# 在项目根目录
node test-backend-simple.js
```

这个脚本会检查：
- 服务器是否运行
- API端点是否可用
- CORS配置是否正确
- 响应格式是否符合预期

### 3. 配置环境变量（可选）

如果需要连接到不同的后端地址，可以在项目根目录创建 `.env` 文件：
```env
VITE_BACKEND_URL=http://localhost:3000
```

### 4. 体验功能

1. 访问 `/demo-with-backend` 路由
2. 输入邮箱地址
3. 检查邮箱或控制台获取魔法链接
4. 点击链接完成登录

## 故障排除

### 常见错误及解决方案

#### 1. 404 Not Found 错误
**错误信息**：`Failed to load resource: the server responded with a status of 404 (Not Found)`

**解决方案**：
- 确保后端服务正在运行
- 检查后端服务是否在正确的端口（默认3000）
- 验证API路径是否正确

#### 2. JSON解析错误
**错误信息**：`Failed to execute 'json' on 'Response': Unexpected end of JSON input`

**解决方案**：
- 检查后端服务是否返回有效的JSON响应
- 确保tRPC版本兼容性
- 验证请求格式是否正确

#### 3. 类型不匹配错误
**错误信息**：TypeScript类型错误，tRPC类型不兼容

**解决方案**：
- 更新 `@tobenot/basic-web-game-backend-contract` 包到最新版本
- 确保前后端使用相同版本的tRPC
- 重新安装依赖：`npm install`

#### 4. 405 Method Not Allowed
**错误信息**：`405 Method Not Allowed`

**解决方案**：
- 确保使用POST方法调用tRPC端点
- 检查请求头是否包含正确的Content-Type
- 验证tRPC客户端配置

### 调试步骤

1. **运行测试脚本**：
   ```bash
   node test-backend-simple.js
   ```

2. **检查后端状态**：
   - 页面会显示后端连接状态指示器
   - 绿色表示连接正常，红色表示连接失败

3. **查看控制台日志**：
   - 打开浏览器开发者工具
   - 查看Console标签页的错误信息
   - 检查Network标签页的请求详情

4. **验证后端服务**：
   ```bash
   # 测试健康检查
   curl -X GET http://localhost:3000/api/trpc/auth.healthCheck \
     -H "Content-Type: application/json"
   
   # 测试登录链接请求
   curl -X POST http://localhost:3000/api/trpc/auth.requestLoginLink \
     -H "Content-Type: application/json" \
     -d '{"0":{"json":{"email":"test@example.com"}}}'
   ```

5. **检查依赖版本**：
   ```bash
   npm list @trpc/client
   npm list @tobenot/basic-web-game-backend-contract
   ```

## 技术实现

### 核心文件结构

```
demo-with-backend/
├── components/
│   ├── LoginScreen.tsx    # 登录界面
│   ├── Dashboard.tsx      # 用户仪表板
│   └── BackendStatus.tsx  # 后端状态检查
├── hooks/
│   └── useAuth.ts         # 认证状态管理
├── services/
│   └── trpc.ts           # tRPC客户端配置
└── index.tsx             # 模块入口
```

### 关键依赖

- `@trpc/client`: tRPC客户端，提供类型安全的API调用
- `@tobenot/basic-web-game-backend-contract`: 后端API类型定义

## 如何移除

如果不需要后端功能，可以轻松移除：

1. **删除整个模块**：
   ```bash
   rm -rf src/games/demo-with-backend
   ```

2. **移除路由**：
   在 `src/App.tsx` 中删除相关导入和路由配置

3. **清理依赖**（可选）：
   ```bash
   npm uninstall @trpc/client @tobenot/basic-web-game-backend-contract
   ```

## 开发提示

- 在开发环境下，魔法链接会在控制台打印出来，方便测试
- 登录状态使用localStorage持久化，刷新页面不会丢失
- 所有API调用都有完整的错误处理
- 组件使用Tailwind CSS进行样式设计

## 扩展建议

- 添加用户资料管理功能
- 实现实时通知系统
- 集成游戏数据持久化
- 添加多语言支持 