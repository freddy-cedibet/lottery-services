import Notification, {NotificationType} from "../models/Notification";
import SMSProvider from "../integrations/interfaces/sms/SMSProvider";

export class NotificationService {
    private smsProvider: SMSProvider;

    constructor() {
        this.smsProvider = new SMSProvider();
    }

    async sendNotification(notification: Notification) {
        switch (notification.type) {
            case NotificationType.SMS:
                await this.smsProvider.sendSMS(notification.recipient, notification.content.body);
                // Update notification status as needed
                break;
            // other cases (e.g., EMAIL, PUSH)...
        }
    }
}
