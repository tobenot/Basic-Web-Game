interface MainMenuProps {
  onStart: () => void;
}

export function MainMenu({ onStart }: MainMenuProps) {
  return (
    <div className="main-menu-container">
      <div className="main-menu">
        <h1 className="title">游戏标题</h1>
        <p className="subtitle">一个基于Carrot模板的游戏</p>
        <div className="button-container">
          <button onClick={onStart} className="menu-button">
            开始新游戏
          </button>
        </div>
      </div>
    </div>
  );
} 