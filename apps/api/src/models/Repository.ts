import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

const repositorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    provider: { type: String, enum: ['github'], default: 'github' },
    owner: { type: String, required: true },
    name: { type: String, required: true },
    fullName: { type: String, required: true, index: true },
    private: { type: Boolean, default: false },
    defaultBranch: { type: String, default: 'main' },
    cloneUrl: { type: String, required: true },
    htmlUrl: { type: String, required: true },
    language: { type: String },
    stars: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    openIssues: { type: Number, default: 0 },
    pullRequests: { type: Number, default: 0 },
    scanStatus: { type: String, enum: ['idle', 'queued', 'scanning', 'complete', 'failed'], default: 'idle' },
    lastScannedAt: { type: Date },
    summary: {
      healthScore: { type: Number, default: 0 },
      securityScore: { type: Number, default: 0 },
      technicalDebtScore: { type: Number, default: 0 },
      maintainabilityScore: { type: Number, default: 0 },
      bugRiskScore: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

repositorySchema.index({ provider: 1, fullName: 1 }, { unique: true });

export type RepositoryDocument = InferSchemaType<typeof repositorySchema> & { userId: Types.ObjectId };
export const Repository = model('Repository', repositorySchema);
