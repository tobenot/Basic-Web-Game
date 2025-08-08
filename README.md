# Carrot Web Game Template (Apps/Packages Layout)

A simple, modular, and extensible web game template based on React, TypeScript, and Vite. Optimized for itch.io and GitHub Pages. This repo is organized for easy reuse and low-maintenance updates.

- Game apps live in `apps/*` (demo apps included)
- Reusable code lives in `packages/*` and shared configs in `configs/*`
- Consumers can either manually copy changes or run a tiny sync script (A+ workflow)

## Quick Start

1. Install deps
```bash
npm install
```
2. Dev server
```bash
npm run dev
```
3. Build
```bash
npm run build
```

## Project Structure

```
/
├── apps/
│   └── web/                 # Main web app (Vite root)
│       ├── public/
│       ├── src/
│       │   ├── games/       # Demo apps (carrot-card-demo, demo-with-backend, portal)
│       │   └── ...
│       └── index.html
├── packages/
│   ├── ui/                  # Reusable UI components (ImageLoader, TypewriterText, GameShell, ...)
│   └── services/            # Reusable services (ResourceLoader, ...)
├── scripts/                 # Build and helper scripts
│   ├── build-itch.js
│   └── update-from-template.sh
├── sync.manifest            # Whitelist for template sync (A+)
├── docs/                    # Detailed documentation
├── vite.config.ts           # Vite config points to apps/web as root, outputs to /dist
└── tailwind.config.js       # Tailwind scans apps and packages
```

## A+ Template Sync (optional, zero lock-in)

- For teams preferring manual copy, keep doing that.
- Alternatively, use the included script to copy only template-managed files from this repo.

Configure your project (optional):
```
# .template-source
TEMPLATE_REPO=https://your.host/your-template.git
TEMPLATE_REF=main
MANIFEST_FILE=sync.manifest
```

Run sync in your project root:
```bash
bash scripts/update-from-template.sh
```
- Backs up overwritten files to `.template_backups/<timestamp>`
- Copies only paths listed in `sync.manifest`

## Build & Deploy

- itch.io: `npm run build:itch` produces `/dist/*.zip`
- GitHub Pages: `npm run build:pages && npm run deploy`

## Notes
- `import.meta.env.BASE_URL` is respected; `ResourceLoader` uses it to resolve assets.
- Tailwind scans `apps/web` and `packages/*`.
- Aliases:
  - `@` -> `apps/web/src`
  - `@ui` -> `packages/ui/src`
  - `@services` -> `packages/services/src`

See `docs/` for details.
