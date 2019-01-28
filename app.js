var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/menucalendar', express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, '/public/favicon.ico')))

app.use(session({
  // 必須項目（署名を行うために使います）
  secret: 'secret',
  // 推奨項目（セッション内容に変更がない場合にも保存する場合にはtrue）
  resave: false,
  // 推奨項目（新規にセッションを生成して何も代入されていなくても値を入れる場合にはtrue）
  saveUninitialized: true,
  // アクセスの度に、有効期限を伸ばす場合にはtrue
  rolling: true,
  // クッキー名（デフォルトでは「connect.sid」）
  name: 'sample-cookie',
  // 一般的なCookie指定
  // デフォルトは「{ path: '/', httpOnly: true, secure: false, maxAge: null }」
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
  }
}));

app.use('/menucalendar', indexRouter);
app.use('/menucalendar/login', login);

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

module.exports = app;
