/*
 * @Author: houxiaoling 
 * @Date: 2020-08-05 10:18:29 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2021-01-06 18:17:54
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
// var uid = uuid.v1();
// var uidv4 = uuid.v4();

var sql = {
	queryById: 'select * from leacots where id=?',
	queryByParentId: 'select * from leacots where father_id=?',
    queryAll: 'select * from leacots',
    add: 'insert into leacots(id, father_id, name, level, content, email, website, replyer, time) VALUES(?,?,?,?,?,?,?,?,?)',
    update:'update leacots set `status`=?, `like`=?, `comment_replys`=? where id=?',
}
module.exports = {
    queryById: function (req, res, next) {
        var id = req.query.id; 
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
	queryByParentId: function (req, res, next) {
		var param = JSON.parse(req.body.info);
        var father_id = param.father_id; 
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            connection.query(sql.queryByParentId, father_id, function (err, result) {
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
    addLeacots: function (req, res, next) {
        pool.getConnection(function (err, connection) {
          if (err) {
            logger.error(err);
            return;
          }
          var param = JSON.parse(req.body.info)
          var time = Date.getTime()
          // 建立连接，向表中插入值
          var uid = uuid.v1();
          connection.query(sql.add, [param.id, param.father_id, param.name, param.level, param.content, param.email, param.website, param.replyer, time], function (err, result) {
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
    updateLeacots : function (req, res, next) {
        pool.getConnection(function (err, connection) {
          if (err) {
            logger.error(err);
            return;
          }
          var param = JSON.parse(req.body.info)
		  const comment_replys = JSON.stringify(param.comment_replys)
		  console.log(param)
		  console.log(comment_replys)

          // 建立连接，向表中插入值
          connection.query(sql.update, [param.status, param.like, comment_replys, param.id], function (err, result) {
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
}
