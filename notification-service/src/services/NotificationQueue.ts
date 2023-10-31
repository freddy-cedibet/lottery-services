import { Notification } from '../models/Notification';

class NotificationQueue {
    private queue: Notification[];

    constructor() {
        this.queue = [];
    }

    // Enqueue a notification
    enqueue(notification: Notification): void {
        this.queue.push(notification);
        console.log('Notification enqueued:', notification);
    }

    // Process the next notification in the queue
    processNext(): void {
        if (this.queue.length === 0) {
            console.log('No notifications to process.');
            return;
        }

        const nextNotification = this.queue.shift(); // Remove the first item from the queue
        if (nextNotification) {
            // Process the notification (example: log it)
            console.log('Processing notification:', nextNotification);
            // Add real processing logic here (e.g., sending via email/SMS)
        }
    }
}

export default NotificationQueue;
