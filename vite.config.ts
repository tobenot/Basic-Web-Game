import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  console.log('Build Config:', {
    mode,
    command,
    VITE_INCLUDE_START_PACK: env.VITE_INCLUDE_START_PACK,
    VITE_BACKEND_URL: env.VITE_BACKEND_URL,
    VITE_PUBLIC_URL: env.VITE_PUBLIC_URL,
    GITHUB_PAGES: process.env.GITHUB_PAGES
  })

  const appRoot = path.resolve(__dirname, 'apps/web');
  // Relative base for local/preview, sub-path base for GitHub Pages deployment.
  const base = process.env.GITHUB_PAGES ? `/${pkg.name}/` : './'

  return {
    root: appRoot,
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        includeAssets: ['favicon.ico', 'vite.svg'],
        manifest: {
          name: 'Basic Web Game',
          short_name: 'Basic Game',
          description: '一个基础的 Web 游戏模板，包含卡牌游戏演示与后端集成示例。',
          theme_color: '#3B5373',
          background_color: '#3B5373',
          display: 'standalone',
          lang: 'zh-CN',
          start_url: base,
          scope: base,
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          navigateFallback: 'index.html',
          navigateFallbackDenylist: [/^\/api/],
        },
      }),
    ],
    base,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './apps/web/src'),
        '@ui': path.resolve(__dirname, './packages/ui/src'),
        '@services': path.resolve(__dirname, './packages/services/src'),
      },
    },
    build: {
      outDir: path.resolve(__dirname, 'dist'),
      emptyOutDir: true,
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    },
    define: {
      'import.meta.env.VITE_INCLUDE_START_PACK': JSON.stringify(env.VITE_INCLUDE_START_PACK),
      'import.meta.env.VITE_BACKEND_URL': JSON.stringify(env.VITE_BACKEND_URL),
      'import.meta.env.VITE_PUBLIC_URL': JSON.stringify(env.VITE_PUBLIC_URL),
    }
  }
})
