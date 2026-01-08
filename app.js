/**
 * @fileoverview Express application configuration and middleware setup.
 * This module creates and configures the main Express application instance
 * with security, parsing, logging, and error handling middleware.
 * @module app
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';

/**
 * Express application instance.
 * @type {import('express').Application}
 */
const app = express();

/**
 * Configures security middleware for the application.
 * - Helmet: Sets various HTTP headers for security
 * - CORS: Enables Cross-Origin Resource Sharing
 * @param {import('express').Application} expressApp - The Express app instance
 */
const configureSecurityMiddleware = (expressApp) => {
  expressApp.use(helmet());
  expressApp.use(cors());
};

/**
 * Configures request parsing middleware.
 * - JSON body parser for application/json
 * - URL-encoded parser for form submissions
 * @param {import('express').Application} expressApp - The Express app instance
 */
const configureParsingMiddleware = (expressApp) => {
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));
};

/**
 * Configures logging middleware.
 * - Morgan: HTTP request logger in 'dev' format
 * - Custom request logger for additional logging
 * @param {import('express').Application} expressApp - The Express app instance
 */
const configureLoggingMiddleware = (expressApp) => {
  expressApp.use(morgan('dev'));
  expressApp.use(requestLogger);
};

/**
 * Configures application routes.
 * @param {import('express').Application} expressApp - The Express app instance
 */
const configureRoutes = (expressApp) => {
  expressApp.use('/', routes);
};

/**
 * Configures error handling middleware.
 * - 404 handler for unmatched routes
 * - Centralized error handler for all errors
 * @param {import('express').Application} expressApp - The Express app instance
 */
const configureErrorHandling = (expressApp) => {
  expressApp.use(notFoundHandler);
  expressApp.use(errorHandler);
};

// Initialize middleware in order
configureSecurityMiddleware(app);
configureParsingMiddleware(app);
configureLoggingMiddleware(app);
configureRoutes(app);
configureErrorHandling(app);

export default app;
