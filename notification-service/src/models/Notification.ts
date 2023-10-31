// models/Notification.ts

export interface INotificationContent {
    title?: string;
    body: string;
}

export enum NotificationType {
    EMAIL = "email",
    SMS = "sms",
    PUSH = "push"
}

export interface Notification {
    id: string;
    type: NotificationType;
    recipient: string; // Could be an email, phone number, device ID, etc.
    content: INotificationContent;
    status?: 'queued' | 'sent' | 'failed'; // Optional status field
    priority?: 'low' | 'normal' | 'high'; // Optional priority field
}

export default Notification;
