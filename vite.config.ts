import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
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

  return {
    root: appRoot,
    plugins: [react()],
    base: process.env.GITHUB_PAGES ? `/${pkg.name}/` : './',
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
