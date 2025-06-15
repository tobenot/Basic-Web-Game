import React from 'react';
import { Link } from 'react-router-dom';
import './Portal.css';
import { TypewriterText } from '@/carrot/components/TypewriterText';
import { ImageLoader } from '@/carrot/components/ImageLoader';

export const Portal: React.FC = () => {
	return (
		<div className="portal-container">
			<header className="portal-header">
				<h1>Carrot Web Game Template</h1>
				<p>A modular and extensible template for building web games with React and Vite.</p>
			</header>

			<main className="portal-main">
				<section className="portal-section">
					<h2>Available Games</h2>
					<div className="game-list">
						<Link to="/carrot-card-demo" className="game-card">
							<ImageLoader
								src="c001"
								alt="Carrot Card Adventure"
								basePath="/illustrations/"
								fallbackSrc="default"
								imageClass="game-card-img"
							/>
							<div className="game-card-title">Carrot Card Adventure</div>
							<div className="game-card-description">
								An interactive storytelling experience where your choices shape the narrative
							</div>
						</Link>
					</div>
				</section>

				<section className="portal-section">
					<h2>Core Components Showcase</h2>
					<div className="component-showcase">
						<div className="showcase-item">
							<h3>TypewriterText</h3>
							<div className="typewriter-demo">
								<TypewriterText text="This component creates an immersive typewriter effect for storytelling and dialogue sequences." enabled={true} />
							</div>
						</div>
						<div className="showcase-item">
							<h3>ImageLoader</h3>
							<div className="image-loader-demo">
								<ImageLoader
									src="showcase"
									alt="Showcase"
									basePath="/img/portal/"
									fallbackSrc="default"
									extension="webp"
									imageClass="showcase-img"
								/>
								<p className="caption">Handles loading, error, and fallback states gracefully.</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}; 