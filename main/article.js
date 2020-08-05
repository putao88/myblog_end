/*
 * @Author: houxiaoling 
 * @Date: 2020-08-05 10:18:29 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-08-05 14:16:19
 * @Description:文章相关请求 
 */

var mysql = require('mysql');
var conf = require('../conf/db');
var logger = require('../common/logger');
// 使用连接池，提升性能
var pool = mysql.createPool(conf.mysql);
var common = require('./common');

var sql = {
    queryById: 'select * from article where id=?',
    queryByType: 'select * from article where type=?',
    queryAll: 'select * from article'

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
    queryByType: function (req, res, next) {
        console.log(req.body)
        var param = JSON.parse(req.body.info); // 为了拼凑正确的sql语句，这里要转下整数
        let type = param.type
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            connection.query(sql.queryByType, type, function (err, result) {
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
    }
}
