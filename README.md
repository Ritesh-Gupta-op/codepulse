# CodePulse AI

CodePulse AI is a SaaS platform for analyzing GitHub repositories and turning software health signals into actionable insights.

## What it includes

- GitHub repository import and scan flows
- AI-assisted code quality, bug, security, and technical debt analysis
- Repository-level dashboards with charts and summary cards
- JWT and Google OAuth authentication scaffolding
- Mongoose data models for users, repositories, scans, reports, and notifications
- A React + Vite frontend shell with responsive SaaS layout components

## Project layout

- `apps/api` - Express API, MongoDB models, GitHub and AI services
- `apps/web` - React dashboard, routing, charts, and UI components
- `docs` - architecture and schema notes

## Getting started

1. Copy `.env.example` to `.env` and fill in the secrets.
2. Install dependencies in each app.
3. Start the backend and frontend dev servers.

## Scripts

- `npm run dev` - run all workspace dev scripts
- `npm run build` - build all workspace packages
- `npm run lint` - lint all workspace packages
