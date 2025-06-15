import React, { useState, useEffect } from 'react';

interface ImageLoaderProps {
	/**
	 * 图片的源路径。
	 */
	src: string;
	/**
	 * 图片的替代文本。
	 */
	alt: string;
	/**
	 * 图片加载成功后应用的CSS类。
	 */
	imageClass?: string;
	/**
	 * 图片加载时占位符应用的CSS类。
	 */
	placeholderClass?: string;
	/**
	 * 图片加载失败时错误状态应用的CSS类。
	 */
	errorClass?: string;
	/**
	 * 图片加载失败时的回退路径。
	 */
	fallbackSrc?: string;
}

const BASE_URL = import.meta.env.BASE_URL;

/**
 * 自动为根相对路径添加BASE_URL前缀。
 * @param path - 原始路径
 * @returns {string} - 处理后的完整URL
 */
function resolveAssetPath(path: string | undefined): string | undefined {
	if (!path) {
		return path;
	}
	// 如果路径已经是绝对URL或以BASE_URL开头，则直接返回
	if (path.startsWith('http') || path.startsWith(BASE_URL)) {
		return path;
	}
	// 对于根路径（以'/'开头），进行拼接
	if (path.startsWith('/')) {
		return `${BASE_URL.replace(/\/$/, '')}${path}`;
	}
	// 相对路径直接返回
	return path;
}

/**
 * 一个能够处理加载、错误和回退状态的图片组件。
 */
export const ImageLoader: React.FC<ImageLoaderProps> = ({
	src,
	alt,
	imageClass,
	placeholderClass,
	errorClass,
	fallbackSrc,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [currentSrc, setCurrentSrc] = useState(resolveAssetPath(src));

	useEffect(() => {
		setIsLoading(true);
		setHasError(false);
		setCurrentSrc(resolveAssetPath(src));
	}, [src]);

	const handleLoad = () => {
		setIsLoading(false);
		setHasError(false);
	};

	const handleError = () => {
		const resolvedFallback = resolveAssetPath(fallbackSrc);
		if (resolvedFallback && currentSrc !== resolvedFallback) {
			setCurrentSrc(resolvedFallback);
		} else {
			setIsLoading(false);
			setHasError(true);
		}
	};

	if (hasError) {
		return (
			<div
				className={
					errorClass ||
					'flex h-full w-full items-center justify-center bg-red-100 text-red-400 dark:bg-red-800 dark:text-red-300'
				}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
		);
	}

	return (
		<>
			{isLoading && (
				<div
					className={
						placeholderClass ||
						'flex h-full w-full items-center justify-center bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500'
					}
				>
					<svg
						className="h-8 w-8 animate-pulse"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				</div>
			)}
			<img
				src={currentSrc}
				alt={alt}
				onLoad={handleLoad}
				onError={handleError}
				className={`${imageClass || ''} transition-opacity duration-300 ${
					isLoading ? 'opacity-0' : 'opacity-100'
				}`}
				style={{ display: isLoading ? 'none' : 'block' }}
			/>
		</>
	);
}; 