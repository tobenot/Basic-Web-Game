import { describe, it, expect } from 'vitest';
import { isRateLimited } from './errors';

describe('isRateLimited', () => {
	it('识别 tRPC TOO_MANY_REQUESTS(消息含请求过于频繁)', () => {
		const err = new Error('请求过于频繁，请稍后再试。');
		(err as any).data = { code: 'TOO_MANY_REQUESTS' };
		expect(isRateLimited(err)).toBe(true);
	});

	it('识别只有 code 没有消息的限流错误', () => {
		const err = new Error('Something went wrong');
		(err as any).data = { code: 'TOO_MANY_REQUESTS' };
		expect(isRateLimited(err)).toBe(true);
	});

	it('OTP 尝试次数过多不算 IP 限流', () => {
		const err = new Error('尝试次数过多，请重新请求验证码。');
		(err as any).data = { code: 'TOO_MANY_REQUESTS' };
		expect(isRateLimited(err)).toBe(false);
	});

	it('普通验证失败不是限流', () => {
		expect(isRateLimited(new Error('链接无效或已过期。'))).toBe(false);
		expect(isRateLimited(new Error('验证码错误。'))).toBe(false);
	});
});
