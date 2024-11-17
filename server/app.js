import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors'

import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';
import messageRouter from './routes/message.js';
import roomRouter from './routes/room.js';
import { dbConfig } from './db.js';

var app = express();
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
  res.status(err.status || 500);
  res.render('error');
});

export default app;
