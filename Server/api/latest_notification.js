const config = require('../config/database-config');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sql-map/latest-notification');

const connection = mysql.createConnection(config);

connection.connect();

// 获取最新通知的列表
router.get('/latest_notification', (req, res) => {
    let sql = $sql.select_all;
    connection.query(sql, [], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取最新通知的列表失败了：' + err))
        }else {
            // res.json(formateResult(200, '获取最新通知的列表成功了！', result));
            res.json(result);
        }
    });
});

// 获取指定id的最新通知
router.get('/latest_notification/:id', (req, res) => {
    let sql = $sql.select_by_id;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取指定id的最新通知失败了：' + err));
        }else {
            // res.json(formateResult(200, '获取指定id的最新通知成功了！', result));
            res.json(result);
        }
    });
})

// 新增一条最新通知
router.post('/latest_notification', (req, res) => {
    let sql = $sql.add_item;
    connection.query(sql, [ req.body.title, req.body.content ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '新增一条最新通知失败了：' + err));
        }else {
            res.json(formateResult(200, '新增一条最新通知成功了！', result));
        }
    });
});

// 根据id更新最新通知
router.put('/latest_notification/:id', (req, res) => {
    let sql = $sql.update_by_id;
    connection.query(sql, [ req.body.title, req.body.content, req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据id更新最新通知失败了：' + err));
        }else {
            res.json(formateResult(200, '根据id更新最新通知成功了！', result));
        }
    });
});

// 根据id删除最新通知
router.delete('/latest_notification/:id', (req, res) => {
    let sql = $sql.detele_item;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据id删除最新通知失败了：' + err));
        }else {
            res.json(formateResult(200, '根据id删除最新通知成功了！', result));
        }
    });
});

module.exports = router;