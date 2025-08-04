import React from 'react';

export const DebugInfo: React.FC = () => {
	// 只在开发环境或URL包含debug参数时显示
	const shouldShow = import.meta.env.DEV || window.location.search.includes('debug=true');
	
	if (!shouldShow) {
		return null;
	}

	const envInfo = {
		VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
		VITE_PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL,
		BASE_URL: import.meta.env.BASE_URL,
		MODE: import.meta.env.MODE,
		DEV: import.meta.env.DEV,
		window_location_origin: window.location.origin,
		window_location_href: window.location.href,
		window_location_pathname: window.location.pathname
	};

	return (
		<div className="fixed top-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-xs max-w-md z-50">
			<h3 className="font-bold mb-2">调试信息</h3>
			<pre className="whitespace-pre-wrap overflow-auto max-h-64">
				{JSON.stringify(envInfo, null, 2)}
			</pre>
		</div>
	);
}; 