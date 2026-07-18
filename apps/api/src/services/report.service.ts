import { Analysis } from '../models/Analysis.js';
import { Repository } from '../models/Repository.js';
import { ApiError } from '../utils/apiError.js';

export async function buildMarkdownReport(repositoryId: string): Promise<string> {
  const [repository, analysis] = await Promise.all([
    Repository.findById(repositoryId).lean(),
    Analysis.findOne({ repositoryId }).sort({ createdAt: -1 }).lean()
  ]);

  if (!repository || !analysis) {
    throw new ApiError(404, 'Report source data not found');
  }

  return [
    `# ${repository.fullName} Software Health Report`,
    '',
    `- Health Score: ${analysis.healthScore}`,
    `- Security Score: ${analysis.securityScore}`,
    `- Technical Debt Score: ${analysis.technicalDebtScore}`,
    `- Maintainability Score: ${analysis.maintainabilityScore}`,
    `- Bug Risk Score: ${analysis.bugRiskScore}`,
    '',
    '## Summary',
    analysis.summary,
    '',
    '## Recommendations',
    ...analysis.recommendations.map((entry) => `- ${entry}`)
  ].join('\n');
}
