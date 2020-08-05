/*
 * @Author: houxiaoling 
 * @Date: 2020-08-05 10:16:07 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-08-05 17:46:41
 * @Description:微语相关请求
 */
var express = require('express');
var router = express.Router();

var user = require('../main/whisper');

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



module.exports = router;