#!/usr/bin/env node

console.log('Testing environment variables...');

const env = {
	GITHUB_PAGES: process.env.GITHUB_PAGES,
	VITE_BACKEND_URL: process.env.VITE_BACKEND_URL,
	VITE_PUBLIC_URL: process.env.VITE_PUBLIC_URL,
	NODE_ENV: process.env.NODE_ENV,
	MODE: process.env.MODE
};

console.log('Environment variables:', env);

// 模拟Vite的define配置
const defineConfig = {
	'import.meta.env.VITE_BACKEND_URL': JSON.stringify(process.env.VITE_BACKEND_URL),
	'import.meta.env.VITE_PUBLIC_URL': JSON.stringify(process.env.VITE_PUBLIC_URL),
	'import.meta.env.BASE_URL': JSON.stringify(process.env.GITHUB_PAGES ? '/Basic-Web-Game/' : './')
};

console.log('Define config:', defineConfig); 