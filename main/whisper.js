/*
 * @Author: houxiaoling 
 * @Date: 2020-08-05 10:18:29 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2021-01-07 18:04:35
 * @Description:文章相关请求 
 */

var mysql = require('mysql');
var conf = require('../conf/db');
var logger = require('../common/logger');
// 使用连接池，提升性能
var pool = mysql.createPool(conf.mysql);
var common = require('./common');
var Date = require('../utils/index');
var uuid = require('node-uuid');

var sql = {
    queryById: 'select * from whisper where id=?',
	queryAll: 'select * from whisper',
	update: 'update whisper set `content`=?, `comment_count`=?, `like_count`=? where id=?',
	insertWhisper:'insert into whisper(id, content, time) VALUES(?,?,?)',
	deleteWhisper:'delete from whisper where FIND_IN_SET(id,?)',

}
module.exports = {
    queryById: function (req, res, next) {
        var id = req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            connection.query(sql.queryById, id, function (err, result) {
                var ret;
                if (err) {
                    logger.error(err);
                } else {
                    ret = {
                        code: 200,
                        data: result
                    };
                }
                common.jsonWrite(res, ret);
                connection.release();
            });
        });
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            connection.query(sql.queryAll, function (err, result) {
                var ret;
                if (err) {
                    logger.error(err);
                } else {
                    ret = {
                        code: 200,
                        data: result
                    };
                }
                common.jsonWrite(res, ret);
                connection.release();
            });
        });
	},
	updateWhisper: function (req, res, next) {
        pool.getConnection(function (err, connection) {
          if (err) {
            logger.error(err);
            return;
          }
          var param = JSON.parse(req.body.info)

          // 建立连接，向表中插入值
          connection.query(sql.update, [param.content, param.comment_count, param.like_count, param.id], function (err, result) {
            if (err) {
              logger.error(err);
            } else {
              result = {
                code: 200,
                msg: '更新成功'
              };
            }
            // 以json形式，把操作结果返回给前台页面
            common.jsonWrite(res, result);
            // 释放连接
            connection.release();
          });
        });
	},
	addWhisper: function (req, res, next) {
        pool.getConnection(function (err, connection) {
          if (err) {
            logger.error(err);
            return;
		  }
		  var param = JSON.parse(req.body.info)
		  var time = Date.getTime()
		  var uid = uuid.v1();
          // 建立连接，向表中插入值
          connection.query(sql.insertWhisper, [uid, param.content, time], function (err, result) {
            if (err) {
              logger.error(err);
            } else {
              result = {
                code: 200,
                msg: '增加成功'
              };
            }
            // 以json形式，把操作结果返回给前台页面
            common.jsonWrite(res, result);
            // 释放连接
            connection.release();
          });
        });
	},
	deleteWhisper: function (req, res, next) {
        pool.getConnection(function (err, connection) {
          if (err) {
            logger.error(err);
          }
          var param = JSON.parse(req.body.info)
          connection.query(sql.deleteWhisper, param.id, function (err, result) {
            if (err) {
              logger.error(err);
            } else {
              result = {
                code: 200,
                msg: '删除成功'
              };
            }
            common.jsonWrite(res, result);
            connection.release();
          });
        });
    },
}
