/*
 * @Author: houxiaoling 
 * @Date: 2020-09-07 11:24:04 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2020-09-15 15:45:48
 */
var express = require('express');
var router = express.Router();

var login = require('../main/login');

// 登录系统
router.post('/adminLogin', function (req, res, next) {
    if (req.method === 'OPTIONS') {
        res.send('GET,HEAD');
    } else {
        login.adminLogin(req, res, next);
    }
});

// 登出系统
router.post('/logout', function (req, res, next) {
    login.logout(req, res, next);
});

module.exports = router;