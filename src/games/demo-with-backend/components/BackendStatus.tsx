import React, { useState, useEffect } from 'react';

export const BackendStatus: React.FC = () => {
	const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const checkBackend = async () => {
			try {
				const response = await fetch('http://localhost:3000/api/trpc/auth.healthCheck', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					}
				});

				if (response.ok) {
					const data = await response.json();
					if (data.result?.data?.status === 'ok') {
						setStatus('connected');
					} else {
						setStatus('error');
						setError('后端服务异常');
					}
				} else {
					setStatus('error');
					setError(`HTTP ${response.status}: ${response.statusText}`);
				}
			} catch (err) {
				setStatus('error');
				setError(err instanceof Error ? err.message : '连接失败');
			}
		};

		checkBackend();
	}, []);

	return (
		<div className="mb-4 p-3 rounded-lg border">
			<h3 className="font-medium mb-2">后端连接状态</h3>
			<div className="flex items-center space-x-2">
				<div className={`w-3 h-3 rounded-full ${
					status === 'checking' ? 'bg-yellow-400' :
					status === 'connected' ? 'bg-green-400' : 'bg-red-400'
				}`}></div>
				<span className="text-sm">
					{status === 'checking' && '检查中...'}
					{status === 'connected' && '已连接'}
					{status === 'error' && `连接失败: ${error}`}
				</span>
			</div>
			{status === 'error' && (
				<div className="mt-2 text-xs text-gray-600">
					<p>请确保后端服务正在运行：</p>
					<p>1. 启动 Basic-Web-Game-Backend 项目</p>
					<p>2. 运行 npm run dev</p>
					<p>3. 确保服务运行在 http://localhost:3000</p>
				</div>
			)}
		</div>
	);
}; 