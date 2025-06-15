# 项目结构

本项目采用模块化的方式组织代码，核心逻辑与具体游戏实现分离，便于维护和扩展。

```
/
├── public/             # 存放静态资源，如图片、字体、配置文件等
│   └── game-config.json # 示例游戏配置文件
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
├── README.md           # 项目简介和快速上手指南
└── docs/               # (本系列文档) 详细的项目文档
``` 