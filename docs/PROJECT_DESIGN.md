# Backend Project Design: Basic-Web-Game-Backend

## 1. Project Vision & Purpose

The `Basic-Web-Game-Backend` project aims to be a **reusable, "batteries-included" backend template** designed to work seamlessly with the `Basic-Web-Game` frontend template.

Its purpose is to provide a solid, type-safe foundation for common game backend features, allowing developers to get a functional and secure backend running with minimal setup. This project will implement the principles and technologies outlined in the `BACKEND_ARCHITECTURE.md` document.

## 2. Initial Features (MVP - Minimum Viable Product)

The initial version of this template will focus on a core set of features essential to many web-based games.

1.  **User Authentication**
    -   **Mechanism**: Simple email and password-based authentication using JWTs (JSON Web Tokens).
    -   **Endpoints**: `register`, `login`, and a protected `me` endpoint to fetch the current user's data.
    -   **Future-Proofing**: The system will be designed to easily accommodate OAuth providers (like Discord or Google) in the future.

2.  **Player Data Persistence**
    -   **Mechanism**: A generic `UserProfile` model linked to the `User` model.
    -   **Flexibility**: The `UserProfile` will include a `gameData` field of type `JSONB`. This allows different games to store arbitrary, game-specific player progress (e.g., stats, inventory, level) without requiring database schema changes, making the template highly reusable.

3.  **Basic Leaderboard Service**
    -   **Mechanism**: A simple `Leaderboard` model to store scores.
    -   **Endpoints**: `submitScore` and `getTopScores` (e.g., top 100).

## 3. Proposed Project Structure

The project will follow a standard, modular structure for scalability and clarity.

```
/
├── prisma/
│   ├── schema.prisma       # Prisma schema for defining database models
│   └── migrations/         # Database migration files
├── src/
│   ├── modules/            # Feature modules (e.g., auth, user, leaderboard)
│   │   ├── auth/
│   │   │   ├── auth.router.ts
│   │   │   └── auth.service.ts
│   │   └── ...
│   ├── router.ts           # Main tRPC router that merges all module routers
│   ├── server.ts           # Fastify server setup and startup
│   ├── context.ts          # tRPC context creation (e.g., attaching user to requests)
│   └── utils/              # Utility functions (e.g., password hashing)
├── .env.example            # Example environment variables
├── package.json
└── tsconfig.json
```

## 4. Deployment Strategy

-   **Containerization**: A `Dockerfile` and `docker-compose.yml` will be provided for easy local development and production deployment.
-   **Hosting**: The containerized app is designed to be deployed on any modern cloud hosting platform, such as [Railway](https://railway.app/), [Fly.io](https://fly.io/), or any VPS.

## 5. Next Steps

The immediate development priority is to implement the **User Authentication** feature, as it is the foundation for all other user-specific functionalities. 