import{GoogleGenAI} from "@google/genai";
import { response } from "express";
import dotenv from "dotenv";
dotenv.config();

type Severity = 'low' | 'medium' | 'high' | 'critical';
const apiKey=process.env.GEMINI_API_KEY;
if(!apiKey){
  console.error("GEMINI_API_KEY is missing in your .env file!");
}
const ai=new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
export const analyzeCodeForBugs=async(codeSnippet:string)=>{
    try{
        const response=await ai.models.generateContent({
            model:"gemini-1.5-flash",
            contents:`Analyze the following code snippet for potential architectural flaws:\n\n${codeSnippet}`,
        });
        return response.text;
    }
        catch(error:any){
            console.error("AI Analysis Error Context:", error);
            const actualMessage=error.statusMessage||error.message||JSON.stringify(error);
            
            throw new Error("Failed to process code analysis pipeline setup interface");

        }
    };






export interface AnalysisInput {
  repositoryName: string;
  language?: string;
  stars: number;
  forks: number;
  openIssues: number;
  recentCommits: number;
  pullRequests: number;
}

export interface AnalysisOutput {
  healthScore: number;
  securityScore: number;
  technicalDebtScore: number;
  maintainabilityScore: number;
  bugRiskScore: number;
  summary: string;
  findings: Array<{
    title: string;
    severity: Severity;
    category: string;
    description: string;
    suggestion: string;
  }>;
  recommendations: string[];
  fixSuggestions: string[];
  documentation: {
    readme: string;
    apiDocs: string;
    architecture: string;
  };
  dependencyInsights: string[];
  commitInsights: string[];
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function generateAnalysis(input: AnalysisInput): AnalysisOutput {
  const activityFactor = Math.min(20, input.recentCommits + input.pullRequests * 2);
  const popularityFactor = Math.min(15, Math.log10((input.stars + input.forks + 1) * 10));
  const languageFactor = input.language === 'TypeScript' ? 8 : input.language === 'JavaScript' ? 4 : 0;

  const healthScore = clampScore(72 + popularityFactor + activityFactor / 2 + languageFactor);
  const securityScore = clampScore(68 + (input.openIssues > 50 ? -10 : 5));
  const technicalDebtScore = clampScore(45 + Math.max(0, 20 - activityFactor) + (input.openIssues > 20 ? 10 : 0));
  const maintainabilityScore = clampScore(60 + languageFactor + Math.max(0, 10 - input.openIssues / 10));
  const bugRiskScore = clampScore(30 + Math.max(0, 25 - activityFactor) + (input.openIssues > 10 ? 12 : 4));

  return {
    healthScore,
    securityScore,
    technicalDebtScore,
    maintainabilityScore,
    bugRiskScore,
    summary: `${input.repositoryName} shows a ${healthScore >= 80 ? 'strong' : 'moderate'} health profile with ${securityScore >= 75 ? 'low' : 'elevated'} security risk signals.`,
    findings: [
      {
        title: 'Potential dependency drift',
        severity: securityScore < 75 ? 'medium' : 'low',
        category: 'Security',
        description: 'A dependency review should be run to catch outdated or vulnerable packages.',
        suggestion: 'Enable automated dependency updates and vulnerability alerts.'
      },
      {
        title: 'Maintenance burden',
        severity: technicalDebtScore > 60 ? 'high' : 'medium',
        category: 'Maintainability',
        description: 'The repository may accumulate debt if issue resolution lags behind active development.',
        suggestion: 'Prioritize refactors for high-churn modules and add targeted tests.'
      }
    ],
    recommendations: [
      'Add CI checks for linting, tests, and vulnerability scanning.',
      'Track ownership for high-risk modules and stale dependencies.',
      'Generate release notes and docs automatically after major changes.'
    ],
    fixSuggestions: [
      'Extract repeated business rules into shared utilities.',
      'Add boundary tests for the most failure-prone flows.',
      'Patch outdated packages and pin version ranges.'
    ],
    documentation: {
      readme: `# ${input.repositoryName}\n\nGenerated project documentation should explain setup, architecture, and common workflows.`,
      apiDocs: 'Generate endpoint descriptions from route handlers, request DTOs, and response shapes.',
      architecture: 'Document service boundaries, data flow, and integration points.'
    },
    dependencyInsights: [
      'Prefer a weekly dependency review cadence.',
      'Flag packages with known CVEs or abandoned maintainers.'
    ],
    commitInsights: [
      'Recent activity indicates the repository is actively maintained.'
    ]
  };
}
