import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, copyFileSync } from 'fs';

// 获取 __dirname 的 ESM 替代方案
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 创建post-build处理脚本
function processDistFolder() {
  const distPath = join(__dirname, '../dist');
  
  // 复制必要的静态资源
  copyPublicFiles();
  
  // 确保所有资源使用相对路径
  updatePaths();
}

function copyPublicFiles() {
  // 复制必要的公共文件到dist目录
  const publicFiles = ['favicon.ico', 'manifest.json'];
  publicFiles.forEach(file => {
    copyFileSync(
      join(__dirname, '../public', file),
      join(__dirname, '../dist', file)
    );
  });
}

function updatePaths() {
  // 更新HTML文件中的路径
  const htmlPath = join(__dirname, '../dist/index.html');
  let htmlContent = readFileSync(htmlPath, 'utf8');
  
  // 将所有绝对路径转换为相对路径
  htmlContent = htmlContent.replace(/href="\//g, 'href="./');
  htmlContent = htmlContent.replace(/src="\//g, 'src="./');
  
  writeFileSync(htmlPath, htmlContent);
}

processDistFolder(); 