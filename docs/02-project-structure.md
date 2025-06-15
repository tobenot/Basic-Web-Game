# 项目结构

本项目采用模块化的方式组织代码，核心逻辑与具体游戏实现分离，便于维护和扩展。

```
/
├── public/             # 存放静态资源，如图片、字体、配置文件等
│   └── game-config.json # 示例游戏配置文件
│   └── version.json    # 用于 itch.io 构建的版本文件
├── src/                # 项目源码
│   ├── assets/         # 全局资源
│   ├── carrot/         # 核心引擎/模板
│   │   ├── components/ # 可复用的通用UI组件
│   │   ├── services/   # 核心服务 (例如，资源加载)
│   │   ├── types/      # 引擎的TypeScript类型定义
│   │   └── ...
│   ├── games/          # 存放所有具体游戏项目
│   │   └── carrot-card-demo/  # 示例卡牌游戏
│   │       ├── components/    # 游戏特有的React组件
│   │       ├── services/      # 游戏特有的服务
│   │       └── types/         # 游戏特有的TypeScript类型定义
│   ├── styles/         # 全局样式
│   ├── App.tsx         # 应用主组件，用于集成和显示游戏
│   └── main.tsx        # 应用入口点
├── scripts/
│   └── build-itch.js   # 用于构建和打包 itch.io 版本的脚本
├── .github/            # GitHub 相关配置 (例如 CI/CD workflows)
├── .gitignore          # Git 忽略文件配置
├── package.json        # 项目依赖与脚本配置
├── README.md           # 项目简介和快速上手指南
└── docs/               # (本系列文档) 详细的项目文档
└── vite.config.ts      # Vite 配置文件
``` 