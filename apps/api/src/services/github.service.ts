import axios from 'axios';
import { ApiError } from '../utils/apiError.js';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  },
  timeout: 15000
});

export interface GithubRepositorySnapshot {
  id: number;
  fullName: string;
  owner: string;
  name: string;
  private: boolean;
  defaultBranch: string;
  cloneUrl: string;
  htmlUrl: string;
  language?: string;
  stars: number;
  forks: number;
  openIssues: number;
}

export async function fetchRepositorySnapshot(owner: string, repo: string, token?: string): Promise<GithubRepositorySnapshot> {
  try {
    const response = await githubApi.get(`/repos/${owner}/${repo}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });

    const data = response.data as Record<string, unknown>;
    return {
      id: Number(data.id),
      fullName: String(data.full_name),
      owner: String((data.owner as { login?: string } | undefined)?.login ?? owner),
      name: String(data.name),
      private: Boolean(data.private),
      defaultBranch: String(data.default_branch ?? 'main'),
      cloneUrl: String(data.clone_url),
      htmlUrl: String(data.html_url),
      language: data.language ? String(data.language) : undefined,
      stars: Number(data.stargazers_count ?? 0),
      forks: Number(data.forks_count ?? 0),
      openIssues: Number(data.open_issues_count ?? 0)
    };
  } catch (error) {
    throw new ApiError(502, 'Unable to fetch repository data from GitHub', error);
  }
}

export async function fetchBranchMetrics(owner: string, repo: string, token?: string): Promise<{ pullRequests: number; recentCommits: number }> {
  try {
    const [pullsResponse, commitsResponse] = await Promise.all([
      githubApi.get(`/repos/${owner}/${repo}/pulls`, { params: { state: 'open', per_page: 1 }, headers: token ? { Authorization: `Bearer ${token}` } : undefined }),
      githubApi.get(`/repos/${owner}/${repo}/commits`, { params: { per_page: 20 }, headers: token ? { Authorization: `Bearer ${token}` } : undefined })
    ]);

    return {
      pullRequests: Number(pullsResponse.headers['x-ratelimit-limit'] ? pullsResponse.data.length : pullsResponse.data.length),
      recentCommits: Array.isArray(commitsResponse.data) ? commitsResponse.data.length : 0
    };
  } catch (error) {
    throw new ApiError(502, 'Unable to fetch repository activity from GitHub', error);
  }
}
