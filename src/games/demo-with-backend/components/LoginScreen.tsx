import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { BackendStatus } from './BackendStatus';

export const LoginScreen: React.FC = () => {
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');
	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage('');

		try {
			console.log('正在尝试连接到后端...');
			const result = await login(email);
			
			if (result.success) {
				setMessage('登录链接已发送到您的邮箱，请查收并点击链接完成登录。');
			} else {
				setMessage(`登录失败: ${result.error}`);
				console.error('登录错误详情:', result.error);
			}
		} catch (error) {
			console.error('未捕获的错误:', error);
			setMessage(`连接错误: ${error instanceof Error ? error.message : '未知错误'}`);
		}
		
		setIsLoading(false);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
			<div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 sm:p-8">
				<div className="text-center mb-6 sm:mb-8">
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">后端演示</h1>
					<p className="text-sm sm:text-base text-gray-600">体验魔法链接登录功能</p>
				</div>

				<BackendStatus />

				<form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
							邮箱地址
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="your@email.com"
							required
							className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
						/>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
					>
						{isLoading ? '发送中...' : '发送登录链接'}
					</button>
				</form>

				{message && (
					<div className={`mt-4 p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
						message.includes('失败') || message.includes('错误')
							? 'bg-red-50 text-red-700 border border-red-200' 
							: 'bg-green-50 text-green-700 border border-green-200'
					}`}>
						{message}
					</div>
				)}

				<div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500">
					<p>💡 提示：在开发环境下，魔法链接会在控制台打印出来</p>
					<p className="mt-2">🔧 调试：请确保后端服务运行在 http://localhost:3000</p>
				</div>
			</div>
		</div>
	);
}; 