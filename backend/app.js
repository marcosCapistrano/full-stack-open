import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './utils/config.js';
import notesRouter from './controllers/notes.js';
import usersRouter from './controllers/users.js';
import loginRouter from './controllers/login.js';
import middleware from './utils/middleware.js';
import logger from './utils/logger.js';

const app = express();

mongoose.set('strictQuery', false);

logger.info("Connection to ", config.MONGODB_URI);

try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to MongoDB!");
} catch(err) {
    logger.error("Error connecting to MongoDB: ", err.message);
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;