/*
 * @Author: houxiaoling 
 * @Date: 2020-08-05 10:16:07 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-09-22 18:00:51
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

router.post('/addArticle', function (req, res, next) {
    article.add(req, res, next);
});

router.post('/updateArtcle', function (req, res, next) {
    article.updateArtcle(req, res, next);
});

router.post('/deleteArtcle', function (req, res, next) {
    article.deleteArtcle(req, res, next);
});

router.get('/queryArticleClassify', function (req, res, next) {
    article.queryArticleClassify(req, res, next);
});

router.post('/addArtcleClassify', function (req, res, next) {
    article.addArtcleClassify(req, res, next);
});

router.post('/updateArtcleClassify', function (req, res, next) {
    article.updateArtcleClassify(req, res, next);
});
router.post('/deleteArtcleClassify', function (req, res, next) {
    article.deleteArtcleClassify(req, res, next);
});

module.exports = router;