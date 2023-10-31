import NpontuSMSProvider from "../integrations/interfaces/sms/NpontuSMSProvider";
import Notification, {NotificationType} from "../models/Notification";

class NotificationService {
    private smsProvider: NpontuSMSProvider;

    constructor(smsProvider: NpontuSMSProvider) {
        this.smsProvider = smsProvider;
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
