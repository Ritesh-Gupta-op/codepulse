import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

const reportSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    repositoryId: { type: Schema.Types.ObjectId, ref: 'Repository', required: true, index: true },
    format: { type: String, enum: ['pdf', 'markdown'], required: true },
    status: { type: String, enum: ['queued', 'generating', 'ready', 'failed'], default: 'queued' },
    downloadUrl: { type: String },
    generatedAt: { type: Date }
  },
  { timestamps: true }
);

export type ReportDocument = InferSchemaType<typeof reportSchema> & { userId: Types.ObjectId; repositoryId: Types.ObjectId };
export const Report = model('Report', reportSchema);
