export type ChatMessage = {
	role: 'user' | 'assistant' | 'system';
	content: string;
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
};

export async function callAiModel({ apiUrl, apiKey, model, messages, temperature = 0.7, maxTokens = 4096, signal, onChunk }: CallParams) {
	const requestBody = { model, messages, stream: true, temperature, max_tokens: maxTokens };
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
	const newMessage = { role: 'assistant' as const, content: '', reasoning_content: '', timestamp: new Date().toISOString() };
	const reader = response.body?.getReader();
	if (!reader) return newMessage;
	const decoder = new TextDecoder();
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		const chunk = decoder.decode(value);
		const lines = chunk.split('\n').filter(l => l.trim());
		for (const line of lines) {
			if (line === 'data: [DONE]') continue;
			try {
				const jsonStr = line.replace('data: ', '');
				if (!jsonStr.trim()) continue;
				const data = JSON.parse(jsonStr);
				if (data.choices?.[0]?.delta?.reasoning_content !== undefined) newMessage.reasoning_content += data.choices[0].delta.reasoning_content || '';
				if (data.choices?.[0]?.delta?.content !== undefined) newMessage.content += data.choices[0].delta.content || '';
				if (onChunk) onChunk(newMessage);
			} catch {}
		}
	}
	return newMessage;
}


