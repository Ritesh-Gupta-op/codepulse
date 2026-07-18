# Architecture

## High-level design

CodePulse AI uses a two-app monorepo:

- `apps/api`: REST API, authentication, GitHub ingestion, AI analysis, reporting, notifications
- `apps/web`: user-facing dashboard and admin console

The API owns all persistence and third-party integrations. The frontend consumes aggregated endpoints and renders dashboard views.

## Request flow

1. User authenticates with email/password or Google OAuth.
2. The frontend requests a repository import.
3. The backend stores the repository, enqueues or triggers analysis, and fetches GitHub metadata.
4. AI services generate insights, remediation suggestions, documentation, and summaries.
5. The frontend renders score cards, charts, tables, and report downloads.

## Core services

- Authentication service issues JWTs and verifies OAuth identities.
- GitHub service normalizes repository, commit, dependency, and security data.
- Analysis service computes maintainability, health, bug risk, and technical debt signals.
- AI service builds prompts for bug prediction, fix suggestions, and documentation generation.
- Report service exports markdown or PDF-ready content.
- Notification service stores and surfaces critical findings.

## Scalability notes

- The scan pipeline should be asynchronous in production.
- MongoDB collections should be indexed on user, repository, provider repo id, scan status, and createdAt.
- External API calls should be rate-limited and cached where possible.
- Long-running repository scans should move to a background worker later without changing the API contract.
