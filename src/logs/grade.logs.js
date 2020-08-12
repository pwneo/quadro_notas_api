import winston from 'winston';
import {env} from '../environment.js';

const {combine, timestamp, label, printf} = winston.format;

const myFormat = printf( ( {level, message, label, timestamp} ) => {
    return `${timestamp} - ${label} - ${level}: ${message}`;
});

export const logger = winston.createLogger({
    level: 'silly',
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({filename: env.FILE_LOG_URL})
    ],
    format: combine(label({label: 'grades-logs'}), timestamp(), myFormat)
});