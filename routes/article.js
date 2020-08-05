/*
 * @Author: houxiaoling 
 * @Date: 2020-08-05 10:16:07 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-08-05 11:35:13
 * @Description:文章相关请求
 */
var express = require('express');
var router = express.Router();

var user = require('../main/article');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/queryAll', function (req, res, next) {
    user.queryAll(req, res, next);
});

router.post('/queryById', function (req, res, next) {
    user.queryById(req, res, next);
});

router.post('/queryByType', function (req, res, next) {
    user.queryByType(req, res, next);
});

module.exports = router;