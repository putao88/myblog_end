var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var domain = require('domain');
var expressJWT = require('express-jwt');
var ejs = require('ejs');

const CONSTANT = require('./common/constant');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article');
var whisperRouter = require('./routes/whisper');


var app = express();

// -------------自定义设置-----------------

// 设置允许跨域访问该服务！
var mimeType = {
    'js': 'text/javascript',
    'html': 'text/html',
    'css': 'text/css'
}
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header('Content-Type', 'video/mp4');
    res.header('Content-Type', 'audio/mp3');
    if (mimeType[req.url.split('.').pop()]) {
        res.header('Content-Type', mimeType[req.url.split('.').pop()] + ';charset:UTF-8');
    }
    next();
});

app.post('*', bodyParser.urlencoded({ extended: true }),
    function (req, res, next) {
        next();
    });

// 输出日志到目录
var fs = require('fs');
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/log/request.log'), { flags: 'a', encoding: 'utf8' }); // 记得要先把目录建好，不然会报错
app.use(logger('combined', { stream: accessLogStream }));

// 处理没有捕获的异常，导致 node
app.use(function (req, res, next) {
    var reqDomain = domain.create();
    reqDomain.on('error', function (err) {
        res.status(err.status || 500);
        console.log('没有捕获的异常....');
        res.setHeader('Content-Type', 'text/html');
        res.render(path.join(__dirname, 'public/index.html'));
    });
    reqDomain.run(next);
});

// token 设置
// app.use(expressJWT({
//     algorithms: ['HS256'],
//     secret: CONSTANT.SECRET_KEY
//   }).unless({
//     // 除了这个地址，其他的URL都需要验证
//     path: ['/getToken',
//       '/getToken/adminLogin',
//       '/appVersion/upload',
//       '/appVersion/download',
//       /^\/public\/.*/,
//       /^\/static\/.*/,
//       /^\/user_disk\/.*/,
//       /^\/user_video\/.*/
//     ]
//   }));
// -------------自定义设置-----------------


// view engine setup
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use('/public', function (req, res, next) {
  // 判断是否为音视频,注意移动版微信会带参数from=message
  const videoParamsIndex = req.url.indexOf('.mp4?');
  const audioParamsIndex = req.url.indexOf('.mp3?');
  let noParamsUrl = req.url;
  if (videoParamsIndex > -1 || audioParamsIndex > -1) {
    noParamsUrl = req.url.split('?').shift();
  }
  if (noParamsUrl.split('.').pop() === 'mp4') {
    res.header('Content-Type', 'video/mp4');
  } else if (noParamsUrl.split('.').pop() === 'mp3') {
    res.header('Content-Type', 'audio/mp3');
  } else {
    res.type('html');
  }
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articleRouter);
app.use('/whispers', whisperRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // 校验 token 失败时的处理
    if (err.name === 'UnauthorizedError') {
      console.log('invalid token...');
    }
  
    // render the error page
    // res.status(err.status || 500);
    console.log('error...');
    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(__dirname, 'public/index.html'));
  });

module.exports = app;
