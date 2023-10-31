import {catchErrors} from "../errors";
import {Notification, NotificationType} from "../models/Notification";
import NotificationQueue from "../services/NotificationQueue";

export const request =
    catchErrors(async (req, res) => {
        const notificationQueue = new NotificationQueue();
        const newNotification : Notification = {
            content: {
                title: "",
                body: ""
            },
            id: "",
            priority: "high",
            recipient: "",
            status: "queued",
            type: NotificationType.SMS,
        }

        notificationQueue.enqueue(newNotification);

        return res.respond({
            data: {}
        });
    })