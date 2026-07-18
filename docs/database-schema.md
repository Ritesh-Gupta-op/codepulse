# Database Schema

## User

- name
- email
- passwordHash
- authProvider
- avatarUrl
- role
- githubProfile
- lastLoginAt

## Repository

- userId
- provider
- owner
- name
- fullName
- private
- defaultBranch
- cloneUrl
- htmlUrl
- language
- stars
- forks
- openIssues
- pullRequests
- lastScannedAt
- scanStatus
- summary metrics

## Analysis

- repositoryId
- userId
- healthScore
- securityScore
- technicalDebtScore
- maintainabilityScore
- bugRiskScore
- summary
- findings
- recommendations
- fixSuggestions
- documentation
- dependencyInsights
- commitInsights
- generatedArtifacts

## Notification

- userId
- repositoryId
- severity
- title
- message
- readAt
- createdAt

## Report

- userId
- repositoryId
- format
- status
- downloadUrl
- createdAt
- generatedAt

## Indexing guidance

- Unique index on `email`
- Unique compound index on `provider` + `fullName`
- Index on `userId`, `repositoryId`, `scanStatus`, and `createdAt`
