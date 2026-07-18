import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

const findingSchema = new Schema(
  {
    title: { type: String, required: true },
    severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    filePath: { type: String },
    lineNumber: { type: Number },
    suggestion: { type: String }
  },
  { _id: false }
);

const analysisSchema = new Schema(
  {
    repositoryId: { type: Schema.Types.ObjectId, ref: 'Repository', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    healthScore: { type: Number, required: true },
    securityScore: { type: Number, required: true },
    technicalDebtScore: { type: Number, required: true },
    maintainabilityScore: { type: Number, required: true },
    bugRiskScore: { type: Number, required: true },
    summary: { type: String, required: true },
    findings: { type: [findingSchema], default: [] },
    recommendations: { type: [String], default: [] },
    fixSuggestions: { type: [String], default: [] },
    documentation: {
      readme: { type: String },
      apiDocs: { type: String },
      architecture: { type: String }
    },
    dependencyInsights: { type: [String], default: [] },
    commitInsights: { type: [String], default: [] },
    generatedArtifacts: { type: [String], default: [] }
  },
  { timestamps: true }
);

export type AnalysisDocument = InferSchemaType<typeof analysisSchema> & { repositoryId: Types.ObjectId; userId: Types.ObjectId };
export const Analysis = model('Analysis', analysisSchema);
