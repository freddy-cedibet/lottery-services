const Queue = require('bull');


export   const queueConfig = (name: string) => {
    return new Queue(name, {
        redis: {
            host: '127.0.0.1',
            port: 6379,
            password: ''
        }
    })
}
