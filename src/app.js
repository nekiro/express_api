import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler, { NotFoundError } from './middlewares/errorHandler';
import validateRequest from './middlewares/validation';
import 'dotenv/config';
import formatData from './middlewares/formatData';

import v1Router from './api/v1/routes';

const app = express();

app.use(cors());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// we don't need to tell our framework
app.disable('x-powered-by');

// schema validator
app.use(validateRequest);

// format
app.use(formatData);

// routes
app.use('/v1', v1Router);

// error handler
app.use(errorHandler);

// unknown routes
app.use((req, res, next) =>
  errorHandler(new NotFoundError('Invalid route'), req, res, next)
);

export default app;
