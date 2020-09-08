/*
 * @Author: houxiaoling 
 * @Date: 2020-09-07 11:23:56 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-09-08 14:20:20
 */
var mysql = require('mysql');
var conf = require('../conf/db');
var jsonWebToken = require('jsonwebtoken');
var logger = require('../common/logger');
const CONSTANT = require('../common/constant');
// 使用连接池，提升性能
var pool = mysql.createPool(conf.mysql);
var common = require('./common');

var sql = {
    qureyByUsername: 'select * from user where name=?',
    updateToken: 'update user set token=? where uid=?'
}

module.exports = {
    adminLogin: function (req, res, next) {
        var param = JSON.parse(req.body.info);
        var username = param.username;
        var password = param.password;
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            connection.query(sql.qureyByUsername, username, function (err, result) {
                if (err) {
                    logger.error(err);
                }
                var ret;
                if (result.length > 0) {
                    var obj = result[0];
                    if (obj.password === password && obj.role === 'admin') {
                        let token = jsonWebToken.sign({ uid: obj.uid }, CONSTANT.SECRET_KEY, { expiresIn: 60 * 60 * 24 * 30 })
                        connection.query(sql.updateToken, [token, obj.uid])
                        ret = {
                            code: 200,
                            success: true,
                            data: {
                                token: token,
                                uid: obj.uid,
                                name: obj.name,
                                role: obj.role
                            }
                        };
                    } else {
                        ret = {
                            code: 200,
                            data: [],
                            success: false,
                            msg: '请输入正确的用户名或账户！'
                        }
                    }
                } else {
                    ret = {
                        code: 200,
                        data: [],
                        success: false,
                        msg: '请输入正确的用户名！'
                    }
                }
                common.jsonWrite(res, ret);
                connection.release();
            });
        });
    }
}