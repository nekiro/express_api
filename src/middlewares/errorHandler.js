import { PrismaClientKnownRequestError } from '@prisma/client';

export class ValidationError extends Error {
  constructor(what) {
    super('');
    this.what = what.details;
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

const errorHandler = (err, _req, res, _next) => {
  if (res.headersSent) {
    return _next(err);
  }

  const error = {
    errorType: err.name,
    errorCode: 500,
  };

  switch (err.constructor) {
    case ValidationError:
      error.error = {};

      err.what.forEach((e) => {
        error.error[e.context.key] = e.message.split('"').join('');
      });

      error.errorCode = 400;
      break;

    case NotFoundError:
      error.error = err.message;
      error.errorCode = 404;
      break;

    case PrismaClientKnownRequestError:
      switch (err.code) {
        case 'P2025':
          error.error = err.meta.cause;
          error.errorCode = 404;
          break;

        case 'P2026':
          error.error = err.meta.cause;
          error.errorCode = 404;
          break;

        default:
          error.error = err.message;
          error.errorCode = 404;
          break;
      }
      break;

    default:
      console.log(err);
      error.error = 'Internal Server Error';
      break;
  }

  res.status(error.errorCode).send(error);
};

export default errorHandler;
