import fs from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import archiver from 'archiver';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 从 package.json 读取项目名称
const packageJson = JSON.parse(
	await fs.readFile(path.join(__dirname, '../package.json'), 'utf-8'),
);
const projectName = packageJson.name || 'game';

const VERSION_FILE = path.join(__dirname, '../public/version.json');

async function updateVersion() {
	let version = { version: '0.0.1' }; // 如果文件不存在，则从 0.0.1 开始
	try {
		const versionData = await fs.readFile(VERSION_FILE, 'utf-8');
		version = JSON.parse(versionData);
	} catch (error) {
		// 如果文件不存在，则使用默认版本，无需创建目录，因为它在 public 下
	}

	// 增加版本号
	const parts = version.version.split('.');
	parts[2] = (parseInt(parts[2], 10) + 1).toString();
	version.version = parts.join('.');

	// 保存新版本号
	await fs.writeFile(VERSION_FILE, JSON.stringify(version, null, 2));

	return version.version;
}

function createZip(version) {
	return new Promise((resolve, reject) => {
		const zipName = `${projectName}-v${version}.zip`;
		const zipPath = path.join(__dirname, '../dist', zipName);
		const output = createWriteStream(zipPath);
		const archive = archiver('zip', { zlib: { level: 9 } });

		output.on('close', () => {
			console.log(
				`ZIP 文件已创建: ${zipName} (${(archive.pointer() / 1024).toFixed(2)} KB)`,
			);
			resolve(zipName);
		});

		archive.on('error', (err) => {
			reject(err);
		});

		archive.pipe(output);

		const sourceDir = path.join(__dirname, '../dist');
		archive.glob('**/*', {
			cwd: sourceDir,
			ignore: [zipName], // 在归档时忽略 ZIP 文件本身
		});

		archive.finalize();
	});
}

async function buildForItch() {
	try {
		// 1. 更新版本号
		const version = await updateVersion();
		console.log(`📦 开始构建 v${version}...`);

		// 2. 清理 dist 目录
		await fs.rm(path.join(__dirname, '../dist'), {
			recursive: true,
			force: true,
		});
		console.log('🧹 清理 dist 目录完成');

		// 3. 构建项目，并设置 base 以确保路径正确
		// 同时将版本号注入为环境变量
		console.log('🚀 执行 Vite 构建...');
		await execAsync(`vite build --base=./`, {
			env: {
				...process.env,
				VITE_APP_VERSION: version,
			},
		});

		// 4. 创建 ZIP 压缩包
		console.log('🗜️ 创建 ZIP 压缩包...');
		const zipName = await createZip(version);

		console.log('✨ 构建完成！');
		console.log(`🎉 发布包已就绪: dist/${zipName}`);
	} catch (error) {
		console.error('😭 构建失败:', error);
		process.exit(1);
	}
}

buildForItch(); 