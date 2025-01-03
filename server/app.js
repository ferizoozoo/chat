import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors'
import http from 'http'

import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';
import messageRouter from './routes/message.js';
import roomRouter from './routes/room.js';
import { dbConfig } from './db.js';
import { SocketServer } from './socket.js';
import { configDotenv } from 'dotenv';

configDotenv();

var app = express();
const server = http.createServer(app); 

const socketServer = new SocketServer(server);
socketServer.start();

dbConfig();

app.use(cors())

app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/messages', messageRouter);
app.use('/rooms', roomRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
