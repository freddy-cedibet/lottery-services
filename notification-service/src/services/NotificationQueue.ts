import * as Queue from 'bull';
import { Notification } from '../models/Notification';
import * as  NotificationService from './NotificationService';

class NotificationQueue {
    private queue: Queue.Queue<Notification>;

    constructor() {
        this.queue = new Queue('notification-queue', {
            redis: {
                host: 'localhost',
                port: 6379
            }
        });

        this.queue.process(async (job, done) => {
            try {
                console.log('Processing notification:', job.data);
                await NotificationService.sendNotification(job.data);
                done();
            } catch (error) {
                console.error('Failed to process notification:', error);
                done(error);
            }
        });
    }

    async enqueue(notification: Notification): Promise<void> {
        await this.queue.add(notification);
        console.log('Notification enqueued:', notification);
    }
}

export default NotificationQueue;
