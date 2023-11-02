import { Queue } from 'bull';
import { Notification } from '../models/Notification';
import { NotificationService } from './NotificationService';
import {queueConfig} from "../utils/helpers";

export class NotificationQueue {
    private queue: Queue<Notification>;

    constructor() {
        this.queue = queueConfig("notification-queue")
    }

    async enqueue(notification: Notification): Promise<void> {
        await this.queue.add(notification);
        await this.queue.process(async (job, done) => {
            try {
                console.log('Processing notification:', job.data);
                const notificationService = new NotificationService();
                await notificationService.sendNotification(job.data);
                done();
            } catch (error) {
                console.error('Failed to process notification:', error);
                if (error instanceof Error) {
                    done(error); // Error is confirmed to be an instance of Error
                } else {
                    done(new Error('An unknown error occurred'));
                }
            }
        });

        console.log('Notification enqueued:', notification);
    }
}

export default NotificationQueue;
