export type ChatMessage = {
	role: 'user' | 'assistant' | 'system';
	content: string;
	reasoning_content?: string;
};

type CallParams = {
	apiUrl: string;
	apiKey: string;
	model: string;
	messages: ChatMessage[];
	temperature?: number;
	maxTokens?: number;
	signal?: AbortSignal;
	onChunk?: (m: { role: 'assistant'; content: string; reasoning_content: string; timestamp: string }) => void;
	stream?: boolean;
};

export async function callAiModel({ apiUrl, apiKey, model, messages, temperature = 0.7, maxTokens = 4096, signal, onChunk, stream = true }: CallParams) {
	const requestBody = { model, messages, stream, temperature, max_tokens: maxTokens };
	const response = await fetch(apiUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
		signal,
		body: JSON.stringify(requestBody)
	});
	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`API请求失败: ${response.status} - ${errorText}`);
	}
	if (!stream) {
		const data = await response.json();
		const content = data?.choices?.[0]?.message?.content ?? '';
		const newMessage = { role: 'assistant' as const, content, reasoning_content: '', timestamp: new Date().toISOString() };
		if (onChunk) onChunk(newMessage);
		return newMessage;
	}
	const newMessage = { role: 'assistant' as const, content: '', reasoning_content: '', timestamp: new Date().toISOString() };
	if (!response.body) return newMessage;
	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let buffer = '';
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		if (!value) continue;
		buffer += decoder.decode(value, { stream: true });
		let idx;
		while ((idx = buffer.indexOf('\n')) >= 0) {
			const line = buffer.slice(0, idx).trim();
			buffer = buffer.slice(idx + 1);
			if (!line.startsWith('data:')) continue;
			const data = line.slice(5).trim();
			if (data === '[DONE]') break;
			try {
				const json = JSON.parse(data);
				const delta = json?.choices?.[0]?.delta;
				if (delta?.reasoning_content) {
					newMessage.reasoning_content += delta.reasoning_content;
				}
				if (delta?.content) {
					newMessage.content += delta.content;
				}
				if (onChunk) {
					onChunk({ ...newMessage });
				}
			} catch (e) {
				console.error('Error parsing SSE chunk', e);
			}
		}
	}
	return newMessage;
}

const getBackendBaseUrl = () => {
	if (import.meta.env.VITE_BACKEND_URL) return import.meta.env.VITE_BACKEND_URL as string;
	if (import.meta.env.DEV) return 'http://localhost:3000';
	return typeof window !== 'undefined' ? window.location.origin : '';
};

type BackendCallParams = {
	model: string;
	messages: ChatMessage[];
	signal?: AbortSignal;
	onChunk?: (m: { role: 'assistant'; content: string; reasoning_content: string; timestamp: string }) => void;
    stream?: boolean;
};

export async function callBackendAi({ model, messages, signal, onChunk, stream = true }: BackendCallParams) {
	const baseUrl = getBackendBaseUrl();
	const token = typeof window !== 'undefined' ? localStorage.getItem('sessionToken') : null;
	const response = await fetch(`${baseUrl}/api/v1/chat/completions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {})
		},
		signal,
        body: JSON.stringify({ model, messages, stream })
	});
	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`AI后端请求失败: ${response.status} - ${errorText}`);
	}
    if (!stream) {
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content ?? '';
        const newMessage = { role: 'assistant' as const, content, reasoning_content: '', timestamp: new Date().toISOString() };
        if (onChunk) onChunk(newMessage);
        return newMessage;
    }
	const newMessage = { role: 'assistant' as const, content: '', reasoning_content: '', timestamp: new Date().toISOString() };
	if (!response.body) return newMessage;
	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let buffer = '';
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		if (!value) continue;
		buffer += decoder.decode(value, { stream: true });
		let idx;
		while ((idx = buffer.indexOf('\n')) >= 0) {
			const line = buffer.slice(0, idx).trim();
			buffer = buffer.slice(idx + 1);
			if (!line.startsWith('data:')) continue;
			const data = line.slice(5).trim();
			if (data === '[DONE]') break;
			try {
				const json = JSON.parse(data);
				const delta = json?.choices?.[0]?.delta;
				if (delta?.reasoning_content) {
					newMessage.reasoning_content += delta.reasoning_content;
				}
				if (delta?.content) {
					newMessage.content += delta.content;
				}
				if (onChunk) {
					onChunk({ ...newMessage });
				}
			} catch (e) {
				console.error('Error parsing SSE chunk', e);
			}
		}
	}
	return newMessage;
}


