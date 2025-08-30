import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { BackendStatus } from './BackendStatus';

type LoginMethod = 'magic-link' | 'verification-code';

export const LoginScreen: React.FC = () => {
	const [email, setEmail] = useState('');
	const [verificationCode, setVerificationCode] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [loginMethod, setLoginMethod] = useState<LoginMethod>('magic-link');
	const [showCodeInput, setShowCodeInput] = useState(false);
	const [challengeId, setChallengeId] = useState<string>('');
	const [magicLinkSent, setMagicLinkSent] = useState(false);
	const { user, login, requestVerificationCode, verifyCode } = useAuth();

	useEffect(() => {
		if (user) {
			setMessage('登录成功，正在跳转...');
			// 强制刷新页面以确保状态同步
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		}
	}, [user]);

	const handleMagicLinkSubmit = async () => {
		try {
			console.log('正在尝试连接到后端...');
			const result = await login(email);
			
			if (result.success) {
				setMagicLinkSent(true);
				setMessage('登录链接已发送到您的邮箱，请查收并点击链接完成登录。');
			} else {
				setMessage(`登录失败: ${result.error}`);
				console.error('登录错误详情:', result.error);
			}
		} catch (error) {
			console.error('未捕获的错误:', error);
			setMessage(`连接错误: ${error instanceof Error ? error.message : '未知错误'}`);
		}
	};

	const handleVerificationCodeSubmit = async () => {
		try {
			if (!showCodeInput) {
				// 第一步：请求验证码（使用融合邮件）
				console.log('正在发送验证码...');
				const result = await requestVerificationCode(email);
				
				if (result.success && result.challengeId) {
					setChallengeId(result.challengeId);
					setShowCodeInput(true);
					setMessage('验证码已发送到您的邮箱，请查收并输入验证码。');
				} else {
					setMessage(`发送验证码失败: ${result.error}`);
					console.error('发送验证码错误详情:', result.error);
				}
			} else {
				// 第二步：验证验证码
				console.log('正在验证验证码...');
				const result = await verifyCode(challengeId, verificationCode);
				
				if (result.success) {
					setMessage('登录成功！');
					// 验证成功后的处理在useAuth中完成
				} else {
					setMessage(`验证码验证失败: ${result.error}`);
					console.error('验证码验证错误详情:', result.error);
				}
			}
		} catch (error) {
			console.error('未捕获的错误:', error);
			setMessage(`连接错误: ${error instanceof Error ? error.message : '未知错误'}`);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage('');

		if (loginMethod === 'magic-link') {
			await handleMagicLinkSubmit();
		} else {
			await handleVerificationCodeSubmit();
		}
		
		setIsLoading(false);
	};

	const handleMethodSwitch = (method: LoginMethod) => {
		setLoginMethod(method);
		setShowCodeInput(false);
		setVerificationCode('');
		setChallengeId('');
		setMessage('');
		setMagicLinkSent(false);
	};

	const getButtonText = () => {
		if (loginMethod === 'magic-link') {
			return '发送登录链接';
		} else {
			return showCodeInput ? '验证登录' : '发送验证码';
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
			<div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 sm:p-8">
				<div className="text-center mb-6 sm:mb-8">
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">后端演示</h1>
					<p className="text-sm sm:text-base text-gray-600">选择您喜欢的登录方式</p>
				</div>

				<BackendStatus />

				{/* 登录方式选择 */}
				<div className="mb-6">
					<div className="flex rounded-lg border border-gray-200 p-1">
						<button
							type="button"
							onClick={() => handleMethodSwitch('magic-link')}
							className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
								loginMethod === 'magic-link'
									? 'bg-blue-100 text-blue-700 border border-blue-300'
									: 'text-gray-500 hover:text-gray-700'
							}`}
						>
							🔗 魔法链接
						</button>
						<button
							type="button"
							onClick={() => handleMethodSwitch('verification-code')}
							className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
								loginMethod === 'verification-code'
									? 'bg-blue-100 text-blue-700 border border-blue-300'
									: 'text-gray-500 hover:text-gray-700'
							}`}
						>
							📱 验证码
						</button>
					</div>
				</div>

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
							disabled={magicLinkSent || showCodeInput}
							className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base disabled:bg-gray-50 disabled:text-gray-500"
						/>
					</div>

					{/* 魔法链接发送成功提示 */}
					{loginMethod === 'magic-link' && magicLinkSent && (
						<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
									</svg>
								</div>
								<div className="ml-3">
									<h3 className="text-sm font-medium text-blue-800">
										📧 请检查您的邮箱
									</h3>
									<div className="mt-2 text-sm text-blue-700">
										<p>登录链接已发送到 <strong>{email}</strong></p>
										<p>请点击邮件中的链接完成登录</p>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* 验证码输入框 */}
					{loginMethod === 'verification-code' && showCodeInput && (
						<div>
							<label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
								验证码
							</label>
							<input
								id="verificationCode"
								type="text"
								value={verificationCode}
								onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
								placeholder="请输入6位验证码"
								maxLength={6}
								required
								className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-center text-2xl tracking-widest"
							/>
						</div>
					)}

					{/* 提交按钮 */}
					{!(loginMethod === 'magic-link' && magicLinkSent) && (
						<button
							type="submit"
							disabled={isLoading || (loginMethod === 'verification-code' && showCodeInput && verificationCode.length !== 6)}
							className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
						>
							{isLoading ? '处理中...' : getButtonText()}
						</button>
					)}

					{/* 重新发送按钮 */}
					{loginMethod === 'magic-link' && magicLinkSent && (
						<button
							type="button"
							onClick={() => {
								setMagicLinkSent(false);
								setMessage('');
							}}
							className="w-full bg-gray-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm sm:text-base"
						>
							重新发送链接
						</button>
					)}
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
					{loginMethod === 'magic-link' ? (
						<>
							<p>💡 提示：在开发环境下，魔法链接会在控制台打印出来</p>
							<p className="mt-2">🔧 调试：请确保后端服务运行在 http://localhost:3000</p>
						</>
					) : (
						<>
							<p>📱 提示：输入邮箱后即可收到验证码</p>
							<p className="mt-2">🔧 调试：请确保后端服务运行在 http://localhost:3000</p>
						</>
					)}
				</div>
			</div>
		</div>
	);
}; 