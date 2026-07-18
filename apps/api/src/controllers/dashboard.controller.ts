import type { Request, Response } from 'express';
import { Analysis } from '../models/Analysis.js';
import { Repository } from '../models/Repository.js';
import { Notification } from '../models/Notification.js';
import { ApiResponse } from '../utils/apiResponse.js';

export async function getDashboardSummary(req: Request, res: Response): Promise<Response> {
  const userId = req.user?.id;
  const filter = userId ? { userId } : {};

  const [repositories, analyses, notifications] = await Promise.all([
    Repository.find(filter).sort({ updatedAt: -1 }).limit(8).lean(),
    Analysis.find(filter).sort({ createdAt: -1 }).limit(6).lean(),
    Notification.find(filter).sort({ createdAt: -1 }).limit(10).lean()
  ]);

  const average = (values: number[]) => (values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0);

  const scores = {
    health: average(analyses.map((item) => item.healthScore)),
    security: average(analyses.map((item) => item.securityScore)),
    technicalDebt: average(analyses.map((item) => item.technicalDebtScore)),
    maintainability: average(analyses.map((item) => item.maintainabilityScore)),
    bugRisk: average(analyses.map((item) => item.bugRiskScore))
  };

  return res.json(
    new ApiResponse('Dashboard summary', {
      repositories,
      analyses,
      notifications,
      scores,
      totals: {
        repositories: repositories.length,
        alerts: notifications.filter((item) => item.severity === 'critical').length
      }
    })
  );
}
