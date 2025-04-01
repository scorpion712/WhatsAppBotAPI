import { Request, Response, NextFunction } from 'express';

const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error for debugging
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
