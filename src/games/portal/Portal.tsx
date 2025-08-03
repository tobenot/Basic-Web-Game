import React from 'react';
import { Link } from 'react-router-dom';
import { TypewriterText } from '@/carrot/components/TypewriterText';
import { ImageLoader } from '@/carrot/components/ImageLoader';

export const Portal: React.FC = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 overflow-y-auto">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
				<header className="text-center mb-8 sm:mb-12 border-b border-gray-200 pb-6 sm:pb-8">
					<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-700 mb-3 sm:mb-4 leading-tight">
						Carrot Web Game Template
					</h1>
					<p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
						A modular and extensible template for building web games with React and Vite.
					</p>
				</header>

				<main className="flex flex-col gap-8 sm:gap-12">
					<section>
						<h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-600">
							Available Games
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
							<Link 
								to="/carrot-card-demo" 
								className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 no-underline bg-white text-gray-800 group border border-gray-100"
							>
								<ImageLoader
									src="c001"
									alt="Carrot Card Adventure"
									basePath="/illustrations/"
									fallbackSrc="default"
									imageClass="w-full h-32 sm:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
								/>
								<div className="p-3 sm:p-4 text-center">
									<div className="font-bold text-base sm:text-lg mb-2">Carrot Card Adventure</div>
									<div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
										An interactive storytelling experience where your choices shape the narrative
									</div>
								</div>
							</Link>
							
							<Link 
								to="/demo-with-backend" 
								className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 no-underline bg-blue-50 text-gray-800 group border border-blue-100"
							>
								<div className="w-full h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
									<div className="text-white text-center">
										<div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">🔐</div>
										<div className="text-xs sm:text-sm">后端集成演示</div>
									</div>
								</div>
								<div className="p-3 sm:p-4 text-center">
									<div className="font-bold text-base sm:text-lg mb-2">后端功能演示</div>
									<div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
										体验魔法链接登录和tRPC类型安全的API集成
									</div>
								</div>
							</Link>
						</div>
					</section>

					<section>
						<h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-600">
							Core Components Showcase
						</h2>
						<div className="flex flex-col gap-6 sm:gap-8">
							<div className="border border-gray-200 p-4 sm:p-6 rounded-lg bg-white shadow-sm">
								<h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">TypewriterText</h3>
								<div className="bg-slate-700 text-gray-100 p-3 sm:p-4 rounded-md font-mono text-sm sm:text-base">
									<TypewriterText text="This component creates an immersive typewriter effect for storytelling and dialogue sequences." enabled={true} />
								</div>
							</div>
							<div className="border border-gray-200 p-4 sm:p-6 rounded-lg bg-white shadow-sm">
								<h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">ImageLoader</h3>
								<div className="flex flex-col items-center gap-2 sm:gap-3">
									<ImageLoader
										src="showcase"
										alt="Showcase"
										basePath="/img/portal/"
										fallbackSrc="default"
										extension="webp"
										imageClass="w-full max-w-sm sm:max-w-md h-32 sm:h-40 lg:h-48 object-cover rounded-md bg-gray-100"
									/>
									<p className="italic text-gray-500 text-xs sm:text-sm text-center">
										Handles loading, error, and fallback states gracefully.
									</p>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}; 