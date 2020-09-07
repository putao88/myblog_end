/*
 * @Author: houxiaoling 
 * @Date: 2020-08-05 10:16:07 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-09-07 14:53:09
 * @Description:微语相关请求
 */
var express = require('express');
var router = express.Router();

var whisper = require('../main/whisper');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/queryAll', function (req, res, next) {
    whisper.queryAll(req, res, next);
});

router.post('/queryById', function (req, res, next) {
    whisper.queryById(req, res, next);
});



module.exports = router;