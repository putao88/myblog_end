/*
 * @Author: houxiaoling 
 * @Date: 2020-07-29 17:19:25 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-07-29 17:30:15
 * @Description:操作日志设置 
 */
/*
  多container及多transport组合
 */
var { createLogger, format, transports } = require('winston');
var { combine, timestamp, printf } = format;
var path = require('path');

var myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

var logger = createLogger({
  level: 'error',
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new (transports.Console)(),
    new (transports.File)({
      filename: path.join(__dirname, '../log/error.log')
    })
  ]
});

module.exports = logger;
