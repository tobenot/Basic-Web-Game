import React from 'react';
import { callAiModel, callBackendAi, type ChatMessage } from '@services/AiService';
import { useAuth } from '../hooks/useAuth';

const MODEL_OPTIONS = [
	{ value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', provider: 'google', inputPricePerMillionTokens: 1.25, outputPricePerMillionTokens: 10.00 },
	{ value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', provider: 'google', inputPricePerMillionTokens: 0.30, outputPricePerMillionTokens: 2.50 },
	{ value: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash-Lite', provider: 'google', inputPricePerMillionTokens: 0.10, outputPricePerMillionTokens: 0.40 },
	{ value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', provider: 'google', inputPricePerMillionTokens: 0.10, outputPricePerMillionTokens: 0.40 },
	{ value: 'gemini-2.0-flash-lite', label: 'Gemini 2.0 Flash-Lite', provider: 'google', inputPricePerMillionTokens: 0.075, outputPricePerMillionTokens: 0.30 },
	{ value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', provider: 'google', inputPricePerMillionTokens: 1.25, outputPricePerMillionTokens: 5.00 },
	{ value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash', provider: 'google', inputPricePerMillionTokens: 0.075, outputPricePerMillionTokens: 0.30 },
	{ value: 'gemini-1.5-flash-8b', label: 'Gemini 1.5 Flash-8B', provider: 'google', inputPricePerMillionTokens: 0.0375, outputPricePerMillionTokens: 0.15 },

	{ value: 'deepseek-chat', label: 'DeepSeek Chat', provider: 'deepseek' },
	{ value: 'deepseek-reasoner', label: 'DeepSeek Reasoner', provider: 'deepseek' },

	{ value: 'gpt-4o', label: 'GPT-4o', provider: 'openai', inputPricePerMillionTokens: 5.00, outputPricePerMillionTokens: 20.00 },
	{ value: 'gpt-4o-mini', label: 'GPT-4o Mini', provider: 'openai', inputPricePerMillionTokens: 0.60, outputPricePerMillionTokens: 2.40 },
	{ value: 'gpt-5', label: 'GPT-5', provider: 'openai', inputPricePerMillionTokens: 1.250, outputPricePerMillionTokens: 10.000 },
	{ value: 'gpt-5-mini', label: 'GPT-5 Mini', provider: 'openai', inputPricePerMillionTokens: 0.250, outputPricePerMillionTokens: 2.000 },
	{ value: 'gpt-5-nano', label: 'GPT-5 Nano', provider: 'openai', inputPricePerMillionTokens: 0.050, outputPricePerMillionTokens: 0.400 },

	{ value: 'claude-opus-4.1', label: 'Claude Opus 4.1', provider: 'anthropic', inputPricePerMillionTokens: 15.00, outputPricePerMillionTokens: 75.00 },
	{ value: 'claude-opus-4', label: 'Claude Opus 4', provider: 'anthropic', inputPricePerMillionTokens: 15.00, outputPricePerMillionTokens: 75.00 },
	{ value: 'claude-sonnet-4', label: 'Claude Sonnet 4', provider: 'anthropic', inputPricePerMillionTokens: 3.00, outputPricePerMillionTokens: 15.00 },
	{ value: 'claude-sonnet-3.7', label: 'Claude Sonnet 3.7', provider: 'anthropic', inputPricePerMillionTokens: 3.00, outputPricePerMillionTokens: 15.00 },
	{ value: 'claude-3.5-haiku', label: 'Claude 3.5 Haiku', provider: 'anthropic', inputPricePerMillionTokens: 0.80, outputPricePerMillionTokens: 4.00 },
];

export const AiChatUnified: React.FC = () => {
	const { user } = useAuth();
	const isLoggedIn = !!user;

	const [useBackend, setUseBackend] = React.useState(true);
	const [apiUrl, setApiUrl] = React.useState('');
	const [apiKey, setApiKey] = React.useState('');
	const [model, setModel] = React.useState('gemini-2.5-flash');
	const [messages, setMessages] = React.useState<ChatMessage[]>([{ role: 'system', content: 'You are a helpful assistant.' }]);
	const [input, setInput] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [stream, setStream] = React.useState(true);
	const [thinking, setThinking] = React.useState(true);
	const abortRef = React.useRef<AbortController | null>(null);
	const messagesEndRef = React.useRef<HTMLDivElement>(null);

	const selectedModelOption = MODEL_OPTIONS.find(option => option.value === model);
	const isGeminiModel = selectedModelOption?.provider === 'google';

	React.useEffect(() => {
		const url = import.meta.env.VITE_AI_API_URL || '';
		setApiUrl(url);
	}, []);

	React.useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const onSend = async () => {
		if (loading) return;
		if (!useBackend && (!apiUrl || !apiKey)) return;
		if (!input.trim()) return;

		const nextMessages = [...messages, { role: 'user', content: input.trim() } as ChatMessage];
		setMessages(nextMessages);
		setInput('');
		setLoading(true);
		setError('');
		const controller = new AbortController();
		abortRef.current = controller;
		const assistantDraft: ChatMessage & { reasoning_content?: string } = { role: 'assistant', content: '' };
		setMessages(prev => [...prev, assistantDraft]);

		let finalModel = model;
		const isGemini = MODEL_OPTIONS.find(o => o.value === model)?.provider === 'google';
		if (isGemini) {
			if (stream) finalModel = `${finalModel}-streaming`;
			if (thinking) finalModel = `${finalModel}:thinking`;
		}

		try {
			if (useBackend) {
				const result = await callBackendAi({
					model: finalModel,
					messages: nextMessages,
					signal: controller.signal,
					stream,
					onChunk: (m: { role: 'assistant'; content: string; reasoning_content: string; timestamp: string }) => {
						assistantDraft.content = m.content;
						if (m.reasoning_content) {
							assistantDraft.reasoning_content = m.reasoning_content;
						}
						setMessages(prev => {
							const copy = [...prev];
							copy[copy.length - 1] = { ...assistantDraft };
							return copy;
						});
					}
				});
				if (!stream) {
					setMessages(prev => {
						const copy = [...prev];
						copy[copy.length - 1] = {
							role: 'assistant',
							content: result.content,
							reasoning_content: result.reasoning_content,
						};
						return copy;
					});
				}
			} else {
				await callAiModel({
					apiUrl,
					apiKey,
					model: finalModel,
					messages: nextMessages,
					signal: controller.signal,
					stream,
					onChunk: (m: { role: 'assistant'; content: string; reasoning_content: string; timestamp: string }) => {
						assistantDraft.content = m.content;
						if (m.reasoning_content) {
							assistantDraft.reasoning_content = m.reasoning_content;
						}
						setMessages(prev => {
							const copy = [...prev];
							copy[copy.length - 1] = { ...assistantDraft };
							return copy;
						});
					}
				});
			}
		} catch (e) {
			setError(e instanceof Error ? e.message : '调用失败');
		} finally {
			setLoading(false);
			abortRef.current = null;
		}
	};

	const onAbort = () => {
		abortRef.current?.abort();
	};

	const onClearChat = () => {
		setMessages([{ role: 'system', content: 'You are a helpful assistant.' }]);
		setError('');
	};

	const canSend = (useBackend && isLoggedIn) || (!useBackend && apiUrl && apiKey);

	return (
		<div className="bg-white border rounded-lg p-4 sm:p-6 space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-base sm:text-lg font-semibold text-gray-900">AI 聊天演示</h2>
				<div className="flex items-center gap-2">
					<span className="text-xs text-gray-500">{messages.length - 1} 条对话</span>
					<button onClick={onClearChat} disabled={loading} 
						className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
						清除
					</button>
				</div>
			</div>
			
			<div className="space-y-3">
				<div className="flex items-center gap-4">
					<label className="flex items-center gap-2 text-sm">
						<input type="radio" name="mode" checked={useBackend} onChange={() => setUseBackend(true)} disabled={!isLoggedIn} />
						<span className={!isLoggedIn ? 'text-gray-400' : ''}>使用后端代理</span>
						{!isLoggedIn && <span className="text-xs text-amber-600">(需要登录)</span>}
					</label>
					<label className="flex items-center gap-2 text-sm">
						<input type="radio" name="mode" checked={!useBackend} onChange={() => setUseBackend(false)} />
						<span>直接调用 API</span>
					</label>
				</div>
				
				{!useBackend && (
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<input className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" placeholder="API URL"
							value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
						<input className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" placeholder="API Key"
							type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
					</div>
				)}
				
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<select className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-white"
						value={model} onChange={(e) => setModel(e.target.value)}>
						{MODEL_OPTIONS.map(option => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					<div className="flex items-center gap-4 text-sm px-3 py-2">
						<label className="flex items-center gap-2">
							<input type="checkbox" checked={stream} onChange={(e) => setStream(e.target.checked)} 
								className="rounded" />
							<span>流式</span>
						</label>
						<label className="flex items-center gap-2">
							<input type="checkbox" checked={thinking} onChange={(e) => setThinking(e.target.checked)}
								disabled={!isGeminiModel} className="rounded" />
							<span className={!isGeminiModel ? 'text-gray-400' : ''}>思考</span>
							{!isGeminiModel && <span className="text-xs text-amber-600">(Gemini独占)</span>}
						</label>
					</div>
				</div>
			</div>
			
			<div className="h-80 border rounded p-3 overflow-auto bg-gray-50 space-y-3">
				{messages.map((m, i) => (
					<div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
						<div className={`max-w-[80%] rounded-lg px-3 py-2 ${
							m.role === 'user' 
								? 'bg-primary text-white' 
								: m.role === 'assistant'
								? 'bg-white border shadow-sm'
								: 'bg-gray-200 text-gray-700'
						}`}>
							<div className="text-xs opacity-70 mb-1">{
								m.role === 'user' ? '用户' : m.role === 'assistant' ? 'AI助手' : '系统'
							}</div>
							{(m as any).reasoning_content && (
								<div className="mb-2 pb-2 border-b border-gray-200/60">
									<h4 className="text-xs font-semibold text-gray-500 mb-1 opacity-80">思考过程</h4>
									<div className="text-xs text-gray-600 whitespace-pre-wrap max-h-40 overflow-auto">
										{(m as any).reasoning_content}
									</div>
								</div>
							)}
							<div className="whitespace-pre-wrap text-sm leading-relaxed">{m.content || (loading && i === messages.length - 1 ? '正在思考...' : '')}</div>
						</div>
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>
			
			<div className="flex gap-2">
				<input className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" placeholder="输入消息"
					value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') onSend(); }} />
				<button onClick={onSend} disabled={loading || !canSend} 
					className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
					{loading ? '发送中...' : '发送'}
				</button>
				<button onClick={onAbort} disabled={!loading} 
					className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
					中止
				</button>
			</div>
			
			{error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">{error}</div>}
		</div>
	);
};
