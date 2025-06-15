import { HashRouter, Routes, Route } from 'react-router-dom';
import { Portal } from './games/portal/Portal';
import { GameContainer } from './games/carrot-card-demo/components/GameContainer';
import { GameShell } from './carrot/components/GameShell';
import './App.css';

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Portal />} />
				<Route 
					path="/carrot-card-demo" 
					element={
						<GameShell orientation="landscape">
							<GameContainer />
						</GameShell>
					} 
				/>
			</Routes>
		</HashRouter>
	);
}

export default App;