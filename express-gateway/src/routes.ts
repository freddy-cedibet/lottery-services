import * as users from './controllers/users';
import * as tickets from './controllers/tickets';
import * as payments from './controllers/payments';
import * as ussd from './controllers/ussd';
import * as notifications from './controllers/notifications';


export const attachPublicRoutes = (app: any): void => {
    //users
    app.get('/api/v1/users', users.getAll)
    app.get('/api/v1/users/:id', users.get)
    app.post('/api/v1/users', users.get)
    app.patch('/api/v1/users/:id', users.update)
    app.delete('/api/v1/users/:id', users.deleteItem)

    //tickets
    app.get('/api/v1/tickets', tickets.getAll)
    app.get('/api/v1/tickets/:id', tickets.get)
    app.post('/api/v1/tickets', tickets.get)
    app.patch('/api/v1/tickets/:id', tickets.update)
    app.delete('/api/v1/tickets/:id', tickets.deleteItem)

    //payments
    app.get('/api/v1/payments', payments.getAll)
    app.get('/api/v1/payments/:id', payments.get)
    app.post('/api/v1/payments', payments.get)
    app.patch('/api/v1/payments/:id', payments.update)
    app.delete('/api/v1/payments/:id', payments.update)

    //ussd
    app.get('/api/v1/ussd', ussd.getAll)
    app.get('/api/v1/ussd/:id', ussd.get)
    app.post('/api/v1/ussd', ussd.get)
    app.patch('/api/v1/ussd/:id', ussd.update)
    app.delete('/api/v1/ussd/:id', ussd.deleteItem)

    //notifications
    app.get('/api/v1/notifications', notifications.getAll)
    app.get('/api/v1/notifications/:id', notifications.get)
    app.post('/api/v1/notifications', notifications.get)
    app.patch('/api/v1/notifications/:id', notifications.update)
    app.delete('/api/v1/notifications/:id', notifications.deleteItem)

}

