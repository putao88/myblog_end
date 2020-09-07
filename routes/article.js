/*
 * @Author: houxiaoling 
 * @Date: 2020-08-05 10:16:07 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-09-07 14:53:23
 * @Description:文章相关请求
 */
var express = require('express');
var router = express.Router();

var article = require('../main/article');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/queryAll', function (req, res, next) {
    article.queryAll(req, res, next);
});

router.post('/queryById', function (req, res, next) {
    article.queryById(req, res, next);
});

router.post('/queryByType', function (req, res, next) {
    article.queryByType(req, res, next);
});

module.exports = router;