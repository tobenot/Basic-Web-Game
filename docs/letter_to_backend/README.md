
## 🔐 Optional Backend Integration

This template includes a **backend integration demo** that showcases how to integrate with a backend service using tRPC and magic link authentication.

### 🚀 Try the Backend Demo

1. **Start the backend service** (from [Basic-Web-Game-Backend](https://github.com/tobenot/Basic-Web-Game-Backend)):
   ```bash
   npm run dev
   ```

2. **Access the demo** at `/demo-with-backend` route

3. **Experience the features**:
   - Magic link authentication
   - Type-safe API calls with tRPC
   - JWT token management
   - Real-time user state

### 📖 Learn More

For detailed backend integration documentation, see [Backend Integration Guide](./docs/07-optional-backend-integration.md).

### 🗑️ Remove Backend Features

If you don't need backend functionality, you can easily remove it:

1. **Delete the demo module**:
   ```bash
   rm -rf src/games/demo-with-backend
   ```

2. **Remove the route** from `src/App.tsx`

3. **Clean up dependencies** (optional):
   ```bash
   npm uninstall @trpc/client
   ```
