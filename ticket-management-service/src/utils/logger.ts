import * as winston from 'winston';
const DailyRotateFile = require('winston-daily-rotate-file');

const fileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
);

 const logger = winston.createLogger({
    level: 'info',
    format: fileFormat,
    transports: [
        new DailyRotateFile({
            filename: 'logs/combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        }),
        new DailyRotateFile({
            level: 'error',
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
});

 export default logger
