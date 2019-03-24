// 首页的路由
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('homepage');
});

router.get('/about', (req, res) => {
    res.send('About page');
});

module.exports = router;