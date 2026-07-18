import { Notification } from '../models/Notification.js';

export async function createCriticalNotification(userId: string, repositoryId: string, title: string, message: string): Promise<void> {
  await Notification.create({
    userId,
    repositoryId,
    severity: 'critical',
    title,
    message
  });
}
