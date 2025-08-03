const API_BASE_URL = 'http://localhost:3000';

async function testBackendConnection() {
	console.log('🔍 测试后端连接...\n');

	// 测试1: 检查服务器是否运行
	console.log('1. 检查服务器状态...');
	try {
		const response = await fetch(`${API_BASE_URL}/api/trpc/auth.healthCheck`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});

		console.log(`   状态码: ${response.status}`);
		console.log(`   状态文本: ${response.statusText}`);

		if (response.ok) {
			console.log('   ✅ 服务器响应正常');
			try {
				const data = await response.json();
				if (data.result?.data?.status === 'ok') {
					console.log('   ✅ 健康检查通过');
				} else {
					console.log('   ⚠️  健康检查失败');
				}
			} catch (e) {
				console.log('   ⚠️  无法解析健康检查响应');
			}
		} else {
			console.log('   ❌ 服务器响应异常');
		}

		// 尝试读取响应内容
		try {
			const text = await response.text();
			console.log(`   响应内容: ${text.substring(0, 200)}...`);
		} catch (e) {
			console.log('   无法读取响应内容');
		}

	} catch (error) {
		console.log(`   ❌ 连接失败: ${error.message}`);
	}

	// 测试2: 检查CORS
	console.log('\n2. 检查CORS配置...');
	try {
		const response = await fetch(`${API_BASE_URL}/api/trpc/auth.healthCheck`, {
			method: 'OPTIONS',
			headers: {
				'Origin': 'http://localhost:5173',
				'Access-Control-Request-Method': 'GET',
				'Access-Control-Request-Headers': 'Content-Type',
			}
		});

		const corsHeaders = response.headers.get('access-control-allow-origin');
		if (corsHeaders) {
			console.log(`   ✅ CORS已配置: ${corsHeaders}`);
		} else {
			console.log('   ⚠️  未找到CORS配置');
		}
	} catch (error) {
		console.log(`   ❌ CORS检查失败: ${error.message}`);
	}

	// 测试3: 检查其他端点
	console.log('\n3. 检查其他端点...');
	const endpoints = [
		'auth.requestLoginLink',
		'auth.verifyMagicToken',
		'user.getMe',
		'announcement.getAnnouncement'
	];

	for (const endpoint of endpoints) {
		try {
			const response = await fetch(`${API_BASE_URL}/api/trpc/${endpoint}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					0: {
						json: endpoint === 'auth.requestLoginLink' ? { email: 'test@example.com' } : {}
					}
				})
			});

			console.log(`   ${endpoint}: ${response.status} ${response.statusText}`);
		} catch (error) {
			console.log(`   ${endpoint}: 连接失败`);
		}
	}

	console.log('\n📋 总结:');
	console.log('- 如果看到404错误，说明端点不存在');
	console.log('- 如果看到405错误，说明端点存在但方法不对');
	console.log('- 如果看到CORS错误，需要配置跨域');
	console.log('- 如果看到JSON解析错误，说明响应格式不对');
	console.log('\n💡 建议:');
	console.log('1. 确保后端服务运行在 http://localhost:3000');
	console.log('2. 检查tRPC路由配置');
	console.log('3. 验证CORS设置');
	console.log('4. 确认API端点路径正确');
}

testBackendConnection().catch(console.error); 