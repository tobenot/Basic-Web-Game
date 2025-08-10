import React, { useState, useEffect } from 'react';
import { trpc } from '../services/trpc';
import { AiChatDemo } from './AiChatDemo';
import { AiChatBackendDemo } from './AiChatBackendDemo';

type DashboardProps = {
    user: { userId: string };
    onLogout: () => void;
};

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
	const [announcements, setAnnouncements] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'user' | 'echo' | 'ai' | 'aiBackend'>('overview');
	const [me, setMe] = useState<{ userId: string } | null>(null);
	const [echoInput, setEchoInput] = useState('Hello Backend');
	const [echoResult, setEchoResult] = useState<string>('');
	const [echoLoading, setEchoLoading] = useState(false);
	const [meLoading, setMeLoading] = useState(false);
	const [meError, setMeError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAnnouncements = async () => {
		try {
			const list = await (trpc as any).announcement.list.query();
			if (Array.isArray(list) && list.length > 0) {
				setAnnouncements(list.map((a: any) => a.message ?? a.announcement ?? String(a)));
			} else if (list?.announcement) {
				setAnnouncements([list.announcement]);
			}
			} catch (error) {
				console.error('获取公告失败:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnnouncements();
	}, []);

	const fetchMe = async () => {
		setMeLoading(true);
		setMeError(null);
		try {
			const result = await (trpc as any).auth.me.query();
			if (!result) {
				throw new Error('未登录或会话已失效');
			}
			const derivedUserId = (result as any).userId ?? (result as any).id;
			if (!derivedUserId) {
				throw new Error('后端未返回用户ID');
			}
			setMe({ userId: String(derivedUserId) });
		} catch (err) {
			setMeError(err instanceof Error ? err.message : '请求失败');
		} finally {
			setMeLoading(false);
		}
	};

	const doEcho = async () => {
		setEchoLoading(true);
		setEchoResult('');
		try {
			const res = await (trpc as any).utils?.echo?.query?.({ text: echoInput });
			if (res?.text) {
				setEchoResult(res.text);
			} else {
				setEchoResult('后端未提供 echo 接口，已回退为本地显示: ' + echoInput);
			}
		} catch (e) {
			setEchoResult('调用失败: ' + (e instanceof Error ? e.message : '未知错误'));
		} finally {
			setEchoLoading(false);
		}
	};

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
                            onClick={onLogout}
							className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm sm:text-base"
						>
							退出登录
						</button>
					</div>

					<div className="border-b border-gray-200 mb-4 sm:mb-6">
						<nav className="-mb-px flex space-x-6" aria-label="Tabs">
							<button className={`whitespace-nowrap py-2 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('overview')}>概览</button>
							<button className={`whitespace-nowrap py-2 border-b-2 font-medium text-sm ${activeTab === 'user' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('user')}>用户信息</button>
                            <button className={`whitespace-nowrap py-2 border-b-2 font-medium text-sm ${activeTab === 'echo' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('echo')}>Echo 示例</button>
                            <button className={`whitespace-nowrap py-2 border-b-2 font-medium text-sm ${activeTab === 'ai' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('ai')}>AI 直连</button>
                            <button className={`whitespace-nowrap py-2 border-b-2 font-medium text-sm ${activeTab === 'aiBackend' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('aiBackend')}>AI 后端代理</button>
						</nav>
					</div>

					{activeTab === 'overview' && (
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
					)}

					{activeTab === 'user' && (
						<div className="bg-white border rounded-lg p-4 sm:p-6">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-base sm:text-lg font-semibold text-gray-900">用户信息 (受保护接口)</h2>
								<button onClick={fetchMe} className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-sm">获取我的信息</button>
							</div>
							{meLoading && <p className="text-sm text-gray-500">加载中...</p>}
							{meError && <p className="text-sm text-red-600">{meError}</p>}
							{me && (
								<div className="text-sm text-gray-800">
									<p>userId: <span className="font-mono">{me.userId}</span></p>
								</div>
							)}
						</div>
					)}

					{activeTab === 'echo' && (
						<div className="bg-white border rounded-lg p-4 sm:p-6">
							<h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Echo 示例 (可替换为任意后端功能)</h2>
							<div className="flex flex-col sm:flex-row gap-3 sm:items-center">
								<input value={echoInput} onChange={(e) => setEchoInput(e.target.value)} className="flex-1 px-3 py-2 border rounded" placeholder="输入任意文本" />
								<button onClick={doEcho} disabled={echoLoading} className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 disabled:opacity-50 text-sm">{echoLoading ? '调用中...' : '调用后端'}</button>
							</div>
							{echoResult && <p className="mt-3 text-sm text-gray-800">结果：{echoResult}</p>}
						</div>
					)}

                {activeTab === 'ai' && (
                    <AiChatDemo />
                )}

                {activeTab === 'aiBackend' && (
                    <AiChatBackendDemo />
                )}
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