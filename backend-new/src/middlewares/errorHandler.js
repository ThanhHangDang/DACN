const ApiError = require('../utils/ApiError');

/**
 * Convert standard errors to ApiError format
 * This ensures all errors follow the same structure
 */
const errorConverter = (err, req, res, next) => {
  let error = err;
  // If it's not already an ApiError, convert it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error.status || 500;
    const message = error.message || 'Lỗi hệ thống';
    error = new ApiError(message, statusCode, false, err.stack);
  }
  next(error);
};

/**
 * Global error handler
 * Final middleware to handle all errors and send standardized responses
 */
const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;
  
  const response = {
    success: false,
    message,
    // Only include stack trace in development environment
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  // Log detailed error info in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error details:', err);
  }

  res.status(statusCode || 500).json(response);
};

module.exports = {
  errorConverter,
  errorHandler
};