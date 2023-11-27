const express = require('express');
const { rateLimit } = require('express-rate-limit');
const morgan = require('morgan');
const cors = require('cors');

const xss = require('xss-clean');
const AppError = require('./utils/AppError');

const projectRoute = require('./routes/project.routes');

const app = express();

app.set('tust proxy', 1);
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: `too many request from this IP, please try again hour`,
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());
app.use(xss());

app.use('/api/v1', limiter);
app.use('/api/v1/project', projectRoute);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this seerver! 💀`, 404)
  );
});

module.exports = app;
