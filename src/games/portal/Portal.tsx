import React from 'react';
import { Link } from 'react-router-dom';
import { TypewriterText } from '@/carrot/components/TypewriterText';
import { ImageLoader } from '@/carrot/components/ImageLoader';

export const Portal: React.FC = () => {
	return (
		<div className="max-w-4xl mx-auto p-8 font-sans text-gray-800">
			<header className="text-center mb-12 border-b border-gray-200 pb-8">
				<h1 className="text-4xl font-bold text-slate-700 mb-4">Carrot Web Game Template</h1>
				<p className="text-xl text-gray-600">A modular and extensible template for building web games with React and Vite.</p>
			</header>

			<main className="flex flex-col gap-12">
				<section>
					<h2 className="text-3xl font-bold mb-6 text-slate-600">Available Games</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<Link 
							to="/carrot-card-demo" 
							className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 no-underline bg-gray-50 text-gray-800 group"
						>
							<ImageLoader
								src="c001"
								alt="Carrot Card Adventure"
								basePath="/illustrations/"
								fallbackSrc="default"
								imageClass="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
							/>
							<div className="p-4 text-center font-bold text-lg">Carrot Card Adventure</div>
							<div className="px-4 pb-4 text-center text-sm text-gray-600 leading-relaxed">
								An interactive storytelling experience where your choices shape the narrative
							</div>
						</Link>
					</div>
				</section>

				<section>
					<h2 className="text-3xl font-bold mb-6 text-slate-600">Core Components Showcase</h2>
					<div className="flex flex-col gap-8">
						<div className="border border-gray-200 p-6 rounded-lg bg-white shadow-sm">
							<h3 className="text-xl font-bold mb-4">TypewriterText</h3>
							<div className="bg-slate-700 text-gray-100 p-4 rounded-md font-mono">
								<TypewriterText text="This component creates an immersive typewriter effect for storytelling and dialogue sequences." enabled={true} />
							</div>
						</div>
						<div className="border border-gray-200 p-6 rounded-lg bg-white shadow-sm">
							<h3 className="text-xl font-bold mb-4">ImageLoader</h3>
							<div className="flex flex-col items-center gap-2">
								<ImageLoader
									src="showcase"
									alt="Showcase"
									basePath="/img/portal/"
									fallbackSrc="default"
									extension="webp"
									imageClass="w-full max-w-md h-48 object-cover rounded-md bg-gray-100"
								/>
								<p className="italic text-gray-500 text-sm">Handles loading, error, and fallback states gracefully.</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}; 