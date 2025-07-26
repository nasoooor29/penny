# MEAN Stack Assessment

This repository contains a monorepo (Nx.dev) with two projects:
- `api`: NestJS backend API
- `front`: Angular frontend with NGRX state management

## Features

- Signup, Sign In, and Sign Out
- Authenticated sessions persist for 8 hours
- Web form to send data via POST request
- Data listing (e.g., users/products) for logged-in users

## Technology Stack

- Nx.dev monorepo
- Angular (UI)
- NGRX (state management)
- NestJS (API)
- MongoDB (Atlas, optional)
- Google Cloud Platform (deployment, optional)

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

3. Configure environment variables for both `api` and `front` (see respective `.env.example` files).

4. Run the backend API:
   ```bash
   nx serve api
   ```

5. Run the frontend:
   ```bash
   nx serve front
   ```

## Optional Enhancements (Bounty Points)

- Forgot Password feature
- Online MongoDB (Atlas)
- GCP deployment

## Submission

- Push all code to GitHub.
- Submit a recording demonstrating app functionality and code walkthrough.
- Deadline: Monday, July 28, 2025
