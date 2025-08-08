import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { trpc } from '../services/trpc';

export const Dashboard: React.FC = () => {
	const { user, logout } = useAuth();
	const [announcements, setAnnouncements] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchAnnouncements = async () => {
			try {
				const result = await trpc.announcement.getAnnouncement.query();
				setAnnouncements([result.announcement]);
			} catch (error) {
				console.error('获取公告失败:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnnouncements();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4 sm:p-6 lg:p-8">
			<div className="max-w-6xl mx-auto">
				<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
						<div>
							<h1 className="text-xl sm:text-2xl font-bold text-gray-900">欢迎回来！</h1>
							<p className="text-sm sm:text-base text-gray-600">用户ID: {user?.userId}</p>
						</div>
						<button
							onClick={logout}
							className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm sm:text-base"
						>
							退出登录
						</button>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
						<div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
							<h2 className="text-base sm:text-lg font-semibold text-blue-900 mb-3 sm:mb-4">🎮 游戏功能</h2>
							<ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-blue-800">
								<li>✅ 魔法链接登录</li>
								<li>✅ 用户认证状态管理</li>
								<li>✅ 后端API集成</li>
								<li>✅ 公告系统</li>
							</ul>
						</div>

						<div className="bg-green-50 p-4 sm:p-6 rounded-lg">
							<h2 className="text-base sm:text-lg font-semibold text-green-900 mb-3 sm:mb-4">🔧 技术特性</h2>
							<ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-green-800">
								<li>✅ tRPC类型安全</li>
								<li>✅ JWT令牌管理</li>
								<li>✅ 响应式设计</li>
								<li>✅ 错误处理</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
					<h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">📢 系统公告</h2>
					{isLoading ? (
						<div className="flex items-center justify-center py-6 sm:py-8">
							<div className="animate-spin rounded-full h-5 sm:h-6 w-5 sm:w-6 border-b-2 border-blue-500"></div>
							<span className="ml-2 text-sm sm:text-base text-gray-600">加载中...</span>
						</div>
					) : announcements.length > 0 ? (
						<div className="space-y-2 sm:space-y-3">
							{announcements.map((announcement, index) => (
								<div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
									<p className="text-sm sm:text-base text-gray-800">{announcement}</p>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-6 sm:py-8 text-gray-500">
							<p className="text-sm sm:text-base">暂无公告</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}; 