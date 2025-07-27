# MEAN Stack Assessment

This repository contains a monorepo (Nx.dev) with two projects:
- `api`: NestJS backend API
- `front`: Angular frontend

## Features

- Signup, Sign In, and Sign Out
- Authenticated sessions persist for 8 hours
- Web form to send data via POST request
- Data listing (e.g., products)
- edit and delete for the logged in users

## Technology Stack

- Nx.dev monorepo
- Angular (UI)
- NestJS (API)
- MongoDB (Atlas, optional)

## Setup

1. Clone the repository:
```bash
git clone <repo-url>
cd <repo-folder>
   ```

2. Install dependencies:
```bash
npm install
```

3. Run the backend API:
```bash
npx nx serve api --skip-nx-cache
```

4. Run the frontend:
```bash
npx nx serve front --skip-nx-cache
```

## Why the project is bad
- started working on it late as you can see from the commits
- family issues
- learned everything in one day and made the project on the next one

