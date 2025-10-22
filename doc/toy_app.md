
# Toy app: login function

A **full-stack web app** built with a **modern Elixir + React stack**, integrating **GraphQL with Absinthe + Relay**, and using **Vite** as the frontend bundler.

---

# 🧱 Overall Architecture

```
+-------------------+
|   React (Vite)    |  ←→  GraphQL API  ←→  |  Phoenix (Elixir)  |
|   Relay Client     |                      |  Absinthe + Ecto    |
+-------------------+                      +---------------------+
                                                ↓
                                         PostgreSQL Database
```

---

# ⚙️ Tech Roles

| Layer                   | Tool              | Purpose                                                                    |
| ----------------------- | ----------------- | -------------------------------------------------------------------------- |
| **Database**            | PostgreSQL        | Stores user accounts, sessions, etc.                                       |
| **ORM / Query Builder** | Ecto              | Connects Phoenix to Postgres; manages schemas, migrations, and queries.    |
| **Backend Framework**   | Phoenix           | Handles HTTP requests, plugs, and GraphQL endpoints.                       |
| **API Layer**           | Absinthe          | Implements GraphQL, Relay-compliant schema (nodes, edges, connections).    |
| **Frontend**            | React (with Vite) | User interface for login/signup and user features.                         |
| **GraphQL Client**      | Relay             | Queries and mutations following Relay spec; uses fragments and pagination. |

---

# Backend

https://github.com/miranda-zhang/elixir_toy_app

---

# Frontend Setup
- [Frontend Deployment (optional)](./frontend/deploy.md)
- [Frontend Login skeloton](./frontend/login.md)
- [Frontend Authentication](./frontend/auth.md)
- [Add query "me" in frontend](./frontend/add_query_me_after_login.md)

# Usefull commands
To compile, start, deploy server
```bash
nvm use
npx relay-compiler
npm run dev
npm run deploy
```
