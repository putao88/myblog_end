/*
 * @Author: houxiaoling 
 * @Date: 2020-08-05 10:18:29 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-10-13 16:57:50
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
var uid = uuid.v1();
var uidv4 = uuid.v4();

var sql = {
    queryById: 'select * from article where id=?',
    queryByType: 'select * from article where type=?',
    queryAll: 'select * from article',
    insertArticle: 'insert into article(id, type, title , content, time) VALUES(?,?,?,?,?)',
    updateArticle: 'update article set type=?, title=?, content=?, time=? where id=?',
    deleteArtcle: 'delete from article where FIND_IN_SET(id,?)',
    queryAllArticleClassify:'select * , false as isArticle from article_classify union select id, type, title, time, true as isArticle from article ',
    insertArticleClassify: 'insert into article_classify(father_id, name, time) VALUES(?,?,?)',
    deleteArtcleClassify: 'delete from article_classify where FIND_IN_SET(id,?)',
    updateArticleClassify: 'update article_classify set name=?, time=? where id=?',
}
module.exports = {
    queryById: function (req, res, next) {
        var param = JSON.parse(req.body.info);
        let id = param.id
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
        var param = JSON.parse(req.body.info);
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
    },
    add: function (req, res, next) {
        pool.getConnection(function (err, connection) {
          if (err) {
            logger.error(err);
            return;
          }
          var param = JSON.parse(req.body.info)
          var time = Date.getTime()
          // 建立连接，向表中插入值
          connection.query(sql.insertArticle, [uid, param.type, param.title, param.content, time], function (err, result) {
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
    updateArtcle: function (req, res, next) {
        pool.getConnection(function (err, connection) {
          if (err) {
            logger.error(err);
            return;
          }
          var param = JSON.parse(req.body.info)
          var time = Date.getTime()
          // 建立连接，向表中插入值
          connection.query(sql.updateArticle, [param.type, param.title, param.content, time, param.id], function (err, result) {
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
    deleteArtcle: function (req, res, next) {
        pool.getConnection(function (err, connection) {
          if (err) {
            logger.error(err);
          }
          var param = JSON.parse(req.body.info)
          connection.query(sql.deleteArtcle, param.id, function (err, result) {
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
    deleteArtcleClassify: function (req, res, next) {
        pool.getConnection(function (err, connection) {
          if (err) {
            logger.error(err);
          }
          var param = JSON.parse(req.body.info)
          connection.query(sql.deleteArtcleClassify, param.id, function (err, result) {
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
    queryArticleClassify: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
            }
            connection.query(sql.queryAllArticleClassify, function (err, result) {
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
    addArtcleClassify: function (req, res, next) {
        pool.getConnection(function (err, connection) {
          if (err) {
            logger.error(err);
            return;
          }
          var param = JSON.parse(req.body.info)
          var time = Date.getTime()
          // 建立连接，向表中插入值
          connection.query(sql.insertArticleClassify, [param.father_id, param.name, time], function (err, result) {
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
    updateArtcleClassify: function (req, res, next) {
        pool.getConnection(function (err, connection) {
          if (err) {
            logger.error(err);
            return;
          }
          var param = JSON.parse(req.body.info)
          var time = Date.getTime()
          // 建立连接，向表中插入值
          connection.query(sql.updateArticleClassify, [param.name, time, param.id], function (err, result) {
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
