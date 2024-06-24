import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import morgan from 'morgan';
import compression from 'compression';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json({ limit: '4GB' }));
    this.server.use(morgan('combined'));
    this.server.use(compression());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use((err, req, res, next) => {
      console.error(err.stack); // Logs the error to the console
      if (res.headersSent) {
        // If headers are already sent, delegate to the default Express error handler
        return next(err);
      }
      return res.status(500).json('Internal server error');
    });
  }
}

export default new App().server;
