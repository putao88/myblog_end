/*
 * @Author: houxiaoling 
 * @Date: 2020-09-07 11:23:56 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-09-07 16:48:44
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
    userLogin: 'select * from user where uid=?',
    adminLogin: 'select * from system where admin_id=?'
}

module.exports = {
    getToken: function (role, req, res, next) {
        var param = JSON.parse(req.body.info);
        var uid = param.username;
        var password = param.password;
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            let sqlSentence = role === 'admin' ? sql.adminLogin : sql.queryById;
            connection.query(sqlSentence, uid, function (err, result) {
                if (err) {
                    logger.error(err);
                }
                var ret;
                if (result.length > 0) {
                    var obj = result[0];
                    if (obj.password === password) {
                        if (role === 'admin') {
                            ret = {
                                code: 200,
                                success: true,
                                data: {
                                    token: jsonWebToken.sign({
                                        uid: obj.admin_id
                                    }, CONSTANT.SECRET_KEY, {
                                        expiresIn: 60 * 60 * 24 * 30
                                    }),
                                    uid: obj.admin_id,
                                    app_id: obj.app_id,
                                    app_version: obj.app_version,
                                    release_date: obj.release_date
                                }
                            };
                        } else {
                            ret = {
                                code: 200,
                                success: true,
                                data: {
                                    token: jsonWebToken.sign({
                                        uid: obj.uid
                                    }, CONSTANT.SECRET_KEY, {
                                        expiresIn: 60 * 60 * 24 * 30
                                    }),
                                    uid: obj.uid,
                                    name: obj.name,
                                    role: obj.role,
                                    sex: obj.sex
                                }
                            };
                        }
                    }
                } else {
                    ret = {
                        code: 200,
                        data:[],
                        success:false,
                        msg:'请输入正确的用户名！'
                    }
                }
                common.jsonWrite(res, ret);
                connection.release();
            });
        });
    }
}