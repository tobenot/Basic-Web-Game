// 限流错误识别:区分「限流(429)」与「验证失败/链接无效」,避免把一切错误都当链接无效或已过期
export const RATE_LIMIT_COOLDOWN_MS = 30_000;
export const RATE_LIMIT_MESSAGE = '请求过于频繁，请稍后再试。';

export function isRateLimited(error: unknown): boolean {
	const err = error as { data?: { code?: string }; message?: string };
	const message = err?.message ?? '';
	if (message.includes('请求过于频繁')) return true;
	// OTP 尝试次数过多(code 也是 TOO_MANY_REQUESTS)不是 IP 限流,提示重新请求验证码即可,不进冷却
	return err?.data?.code === 'TOO_MANY_REQUESTS' && !message.includes('尝试次数过多');
}
