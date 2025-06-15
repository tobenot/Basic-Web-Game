# Carrot Web Game Template

![Made with React & TypeScript](https://img.shields.io/badge/Made%20with-React%20%26%20TypeScript-blue.svg?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A simple, modular, and extensible web game template based on React, TypeScript, and Vite. Designed for rapid prototyping and building games for platforms like **itch.io** and **GitHub Pages**.

> **Note**: For detailed technical documentation, please refer to our **[Full Documentation](./docs/README.md)**.

---

## ✨ Features

-   **Modular Architecture**: Core engine (`carrot`) is separated from game-specific logic (`games`).
-   **Vite Powered**: Fast development server and optimized builds.
-   **React + TypeScript**: Modern, type-safe UI development.
-   **Ready for Deployment**: Built-in scripts for easy deployment to **itch.io** and **GitHub Pages**.
-   **Easy to Customize**: Designed to be a clean starting point for your next web-based game.

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation & Development

1.  Clone this repository or use it as a template.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    Your game will be running at `http://localhost:5173`.

## 📦 Building for Production

To create a production-ready build, run:
```bash
npm run build
```
This will generate a `dist` directory with all your game files.

-   **For itch.io**: Use `npm run build:itch`. This command automatically adjusts asset paths, making your game ready to upload.
-   **For GitHub Pages**: Use `npm run deploy`. This will build your project and deploy it to GitHub Pages.

> For more details on build commands and local testing, see the [Build and Deployment section in our documentation](./docs/05-build-and-deploy.md).

## 📂 Project Structure

```
/
├── dist/               # Production build output
├── docs/               # Detailed project documentation
├── public/             # Static assets (images, fonts, config files)
├── src/                # Source code
│   ├── carrot/         # The core engine/template
│   ├── games/          # Houses all specific game projects
│   └── ...
├── scripts/
│   └── post-build.js   # Script to fix paths for itch.io deployment
├── .github/            # GitHub-specific files (e.g., workflows)
└── ...
```

A more detailed breakdown of the project structure is available in [our documentation](./docs/02-project-structure.md).

## 🎨 Customization

To create your own game:

1.  Duplicate the `src/games/carrot-card-demo` directory and rename it.
2.  Develop your game-specific logic, components, and types inside that new directory.
3.  In `src/App.tsx`, change the import to point to your new game's main component.

The detailed guide is in [our documentation](./docs/04-creation-and-extension.md).

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or find a bug, please first read our **[Contribution Guide](./docs/06-contributing.md)**.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
