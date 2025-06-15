# Carrot Web Game Template

A simple, modular, and extensible web game template based on React, TypeScript, and Vite.

## Features

-   **Modular Architecture**: Core engine (`carrot`) is separated from game-specific logic (`games`).
-   **Vite Powered**: Fast development server and optimized builds.
-   **React + TypeScript**: Modern, type-safe UI development.
-   **Simple Asset Loading**: Centralized resource loader for easy management of game assets.
-   **Easy to Customize**: Designed to be a clean starting point for any web-based game.

## Getting Started

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

## Building for Production

To create a production build, simply run:

```bash
npm run build
```

This will generate a `dist` directory. The contents of this directory are ready to be deployed to any static hosting service.

-   **For itch.io or similar platforms**: Simply upload the contents of the `dist` folder.
-   **For GitHub Pages**: This template uses the `gh-pages` package for easy deployment. For it to work correctly, ensure the `name` field in your `package.json` matches your GitHub repository name. Then, simply run `npm run deploy`.

## Project Structure

```
/
├── public/             # Static assets (images, fonts, config files)
├── src/                # Source code
│   ├── carrot/         # The core engine/template
│   │   ├── components/ # Reusable, generic UI components
│   │   └── services/   # Core services (e.g., ResourceLoader)
│   ├── games/          # Houses all specific game projects
│   │   └── demo-game/  # The example card game
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Application entry point
├── vite.config.ts      # Vite configuration
└── ...
```

## Customization

To create your own game:

1.  Create a new directory inside `src/games/`, for example `my-awesome-game`.
2.  Develop your game-specific components, services, and types inside that directory.
3.  In `src/App.tsx`, change the import to point to your new game's main component.

## License

MIT License

For more detailed documentation on the project structure, core engine, and how to create a new game, please see [DOCUMENTATION.md](./DOCUMENTATION.md).
