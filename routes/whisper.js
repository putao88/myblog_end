/*
 * @Author: houxiaoling 
 * @Date: 2020-08-05 10:16:07 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2021-01-07 18:03:17
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

router.post('/updateWhisper', function (req, res, next) {
    whisper.updateWhisper(req, res, next);
});

router.post('/addWhisper', function (req, res, next) {
    whisper.addWhisper(req, res, next);
});

router.post('/deleteWhisper', function (req, res, next) {
    whisper.deleteWhisper(req, res, next);
});




module.exports = router;