import { HashRouter, Routes, Route } from 'react-router-dom';
import { Portal } from './games/portal/Portal';
import { GameContainer } from './games/carrot-card-demo/components/GameContainer';
import { DemoWithBackend } from './games/demo-with-backend';
import { GameShell } from '@ui/GameShell';

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
				<Route 
					path="/demo-with-backend" 
					element={<DemoWithBackend />} 
				/>
			</Routes>
		</HashRouter>
	);
}

export default App;