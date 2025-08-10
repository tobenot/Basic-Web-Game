import React from 'react';
import { callBackendAi, type ChatMessage } from '@services/AiService';

export const AiChatBackendDemo: React.FC = () => {
	const [model, setModel] = React.useState('gpt-4o-mini');
	const [messages, setMessages] = React.useState<ChatMessage[]>([{ role: 'system', content: 'You are a helpful assistant.' }]);
	const [input, setInput] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const abortRef = React.useRef<AbortController | null>(null);

	const onSend = async () => {
		if (!input.trim() || loading) return;
		const nextMessages = [...messages, { role: 'user', content: input.trim() } as ChatMessage];
		setMessages(nextMessages);
		setInput('');
		setLoading(true);
		setError('');
		const controller = new AbortController();
		abortRef.current = controller;
		const assistantDraft: ChatMessage = { role: 'assistant', content: '' };
		setMessages(prev => [...prev, assistantDraft]);
		try {
			await callBackendAi({
				model,
				messages: nextMessages,
				signal: controller.signal,
				onChunk: (m) => {
					assistantDraft.content = m.content;
					setMessages(prev => {
						const copy = [...prev];
						copy[copy.length - 1] = { role: 'assistant', content: assistantDraft.content };
						return copy;
					});
				}
			});
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

	return (
		<div className="bg-white border rounded-lg p-4 sm:p-6 space-y-4">
			<h2 className="text-base sm:text-lg font-semibold text-gray-900">AI 后端代理演示</h2>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
				<input className="px-3 py-2 border rounded col-span-1 sm:col-span-1" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
			</div>
			<div className="h-64 border rounded p-3 overflow-auto bg-gray-50">
				{messages.map((m, i) => (
					<div key={i} className="mb-2">
						<div className="text-xs text-gray-500">{m.role}</div>
						<div className="whitespace-pre-wrap text-sm">{m.content}</div>
					</div>
				))}
			</div>
			<div className="flex gap-2">
				<input className="flex-1 px-3 py-2 border rounded" placeholder="输入消息"
					value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') onSend(); }} />
				<button onClick={onSend} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">发送</button>
				<button onClick={onAbort} disabled={!loading} className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50">中止</button>
			</div>
			{error && <div className="text-sm text-red-600">{error}</div>}
		</div>
	);
};


