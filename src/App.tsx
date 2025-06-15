import './App.css';
import { GameContainer } from '@/games/carrot-card-demo/components/GameContainer';

function App() {
  return (
    <>
      {/* 竖屏提示遮罩 */}
      <div className="hidden portrait:flex fixed inset-0 bg-black text-white z-[9999] justify-center items-center text-center text-[1.2vh]">
        请旋转设备至横屏模式以获得最佳体验
      </div>
      
      {/* 固定比例容器 */}
      <div className="relative w-screen h-[56.25vw] max-h-screen max-w-[177.78vh] my-auto mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-[20fr_60fr_20fr] bg-[#1a1a2e]">
          <GameContainer />
        </div>
      </div>
    </>
  );
}

export default App;