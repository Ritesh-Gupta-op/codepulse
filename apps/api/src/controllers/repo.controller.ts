import type { Request, Response } from 'express';
import { Analysis } from '../models/Analysis.js';
import { Repository } from '../models/Repository.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { fetchBranchMetrics, fetchRepositorySnapshot } from '../services/github.service.js';
import { generateAnalysis } from '../services/ai.service.js';

export async function importRepository(req: Request, res: Response): Promise<Response> {
  const { owner, repo } = req.body as { owner?: string; repo?: string };
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, 'Authentication required');
  }

  if (!owner || !repo) {
    throw new ApiError(400, 'Repository owner and name are required');
  }

  const snapshot = await fetchRepositorySnapshot(owner, repo);
  const metrics = await fetchBranchMetrics(owner, repo);
  const repository = await Repository.findOneAndUpdate(
    { provider: 'github', fullName: snapshot.fullName },
    {
      userId,
      provider: 'github',
      owner: snapshot.owner,
      name: snapshot.name,
      fullName: snapshot.fullName,
      private: snapshot.private,
      defaultBranch: snapshot.defaultBranch,
      cloneUrl: snapshot.cloneUrl,
      htmlUrl: snapshot.htmlUrl,
      language: snapshot.language,
      stars: snapshot.stars,
      forks: snapshot.forks,
      openIssues: snapshot.openIssues,
      scanStatus: 'queued'
    },
    { upsert: true, new: true }
  );

  const analysis = generateAnalysis({
    repositoryName: repository.fullName,
    language: repository.language ?? undefined,
    stars: repository.stars,
    forks: repository.forks,
    openIssues: repository.openIssues,
    recentCommits: metrics.recentCommits,
    pullRequests: metrics.pullRequests
  });

  const savedAnalysis = await Analysis.create({
    repositoryId: repository._id,
    userId,
    ...analysis
  });

  await Repository.findByIdAndUpdate(repository._id, {
    scanStatus: 'complete',
    lastScannedAt: new Date(),
    summary: {
      healthScore: savedAnalysis.healthScore,
      securityScore: savedAnalysis.securityScore,
      technicalDebtScore: savedAnalysis.technicalDebtScore,
      maintainabilityScore: savedAnalysis.maintainabilityScore,
      bugRiskScore: savedAnalysis.bugRiskScore
    }
  });

  return res.status(201).json(new ApiResponse('Repository imported and analyzed', { repository, analysis: savedAnalysis }));
}

export async function listRepositories(req: Request, res: Response): Promise<Response> {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Authentication required');
  }

  const repositories = await Repository.find({ userId }).sort({ updatedAt: -1 }).lean();
  return res.json(new ApiResponse('Repositories fetched', { repositories }));
}

export async function getRepositoryInsights(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const repository = await Repository.findById(id).lean();
  const analysis = await Analysis.findOne({ repositoryId: id }).sort({ createdAt: -1 }).lean();

  if (!repository || !analysis) {
    throw new ApiError(404, 'Repository insights not found');
  }

  return res.json(new ApiResponse('Repository insights fetched', { repository, analysis }));
}
