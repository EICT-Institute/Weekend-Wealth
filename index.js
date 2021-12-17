require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MulterError } = require('multer');
const errors = require('./errors');
const logger = require('./utils/logger');

const { NODE_ENV, PORT } = require('./config/env');

const corsMiddleware = cors();

const app = express();

const jsonParser = express.json();
const urlEncodedParser = express.urlencoded({ extended: true });

const routes = require('./routes');

const errorHandlers = require('./middlewares/errorHandlers');

const healthTest = (req, res) => {
  res.status(200);
  res.send('API is Up.');
};

app.use(corsMiddleware);
app.use(jsonParser);
app.use(urlEncodedParser);

app.all('/', healthTest);

// use service end-point routes

app.use(routes);

// use error handler middlewares

app.use(errorHandlers.authenticationErrorHandler(errors));
app.use(errorHandlers.conflictErrorHandler(errors));

app.use(errorHandlers.internalServerErrorHandler(errors, logger));
app.use(errorHandlers.routeNotFoundErrorHandler(errors));

const port = PORT;

app.listen(port, () => {
  console.info(`API running on port ${port}!`);
});

module.exports = app;
