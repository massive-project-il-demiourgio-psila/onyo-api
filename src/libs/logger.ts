import pino from 'pino'
import pinoHttp from 'pino-http'
import pretty from 'pino-pretty';

const stream = pretty({
    colorize: true
})

const logger = pino(stream);
const httpLogger = pinoHttp({
    logger
})

export { logger as default, logger, httpLogger }
