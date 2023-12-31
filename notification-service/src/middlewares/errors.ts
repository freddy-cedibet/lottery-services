import { ErrorRequestHandler } from 'express';
import { pick } from 'lodash';
import * as Sentry from "@sentry/node"


import { CustomError } from '../errors';

export const handleError: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  const isErrorSafeForClient = error instanceof CustomError;

  const clientError = isErrorSafeForClient
    ? pick(error, ['message', 'code', 'status', 'data'])
    : {
        message: 'Something went wrong.',
        code: 'INTERNAL_ERROR',
        status: 500,
        data: {}
      }

      Sentry.captureException(clientError)
      res.status(clientError.status).send({ error: clientError });
}
