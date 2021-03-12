import express from 'express';
import logger from './src/utility/logger';
import config from './config/config';

import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

import MongoConnector from './database';
import UserRoutes from './src/domains/user/user.router';
import TeamRoutes from './src/domains/team/team.router';

const NAMESPACE = 'Server';

const app = express();

// Database connection
MongoConnector.connect();

// Middleware initialization
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());
app.use(helmet());

// Routes definitions
app.use('/api/users', UserRoutes);
app.use('/api/teams', TeamRoutes);

app.listen(config.server.port, () =>
    logger.info(NAMESPACE, `Server running on ${config.server.host}:${config.server.port}`)
);
