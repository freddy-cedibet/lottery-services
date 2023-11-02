import * as NotificationController from "./controllers/NotificationController"

export const attachPublicRoutes = (app: any): void => {
    app.post('/api/v1/notifications', NotificationController.sendNotification)
}


