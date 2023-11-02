import {catchErrors} from "../errors";
import {Notification, NotificationType} from "../models/Notification";
import NotificationQueue from "../services/NotificationQueue";

export const sendNotification =
    catchErrors(async (req, res) => {
        const {title, body, id, priority, recipient, type} = req.body
        const notificationQueue = new NotificationQueue();
        const newNotification : Notification = {
            content: {
                title: title,
                body: body
            },
            id: id,
            priority: priority,
            recipient: recipient,
            status: "queued",
            type: type.includes("sms") ? NotificationType.SMS : NotificationType.EMAIL,
        }

        notificationQueue.enqueue(newNotification);

        return res.respond({
            data: {}
        });
    })