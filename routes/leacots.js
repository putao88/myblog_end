/*
 * @Author: houxiaoling 
 * @Date: 2020-08-05 10:16:07 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-09-07 14:52:32
 * @Description:留言相关请求
 */
var express = require('express');
var router = express.Router();

var leacots = require('../main/leacots');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/queryAll', function (req, res, next) {
    leacots.queryAll(req, res, next);
});

router.post('/queryById', function (req, res, next) {
    leacots.queryById(req, res, next);
});



module.exports = router;