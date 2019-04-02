const config = require('../config/database-config');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sql-map/employment_policy');

const connection = mysql.createConnection(config);

connection.connect();

// 获取就业政策的列表
router.get('/employment_policy', (req, res) => {
    let sql = $sql.select_all;
    connection.query(sql, [], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取就业政策的列表失败了：' + err))
        }else {
            res.json(formateResult(200, '获取就业政策的列表成功了！', result));
        }
    });
});

// 获取指定id的就业政策
router.get('/employment_policy/:id', (req, res) => {
    let sql = $sql.select_by_id;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取指定id的就业政策失败了：' + err));
        }else {
            // res.json(formateResult(200, '获取指定id的就业政策成功了！', result));
            res.json(result);
        }
    });
})

// 新增一条就业政策
router.post('/employment_policy', (req, res) => {
    let sql = $sql.add_item;
    connection.query(sql, [ req.body.title, req.body.content ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '新增一条就业政策失败了：' + err));
        }else {
            // res.json(formateResult(200, '新增一条就业政策成功了！', result));
            res.json(result);
        }
    });
});

// 根据id更新就业政策
router.put('/employment_policy/:id', (req, res) => {
    let sql = $sql.update_by_id;
    connection.query(sql, [ req.body.title, req.body.content, req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据id更新就业政策失败了：' + err));
        }else {
            res.json(formateResult(200, '根据id更新就业政策成功了！', result));
        }
    });
});

// 根据id删除就业政策
router.delete('/employment_policy/:id', (req, res) => {
    let sql = $sql.detele_item;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据id删除就业政策失败了：' + err));
        }else {
            res.json(formateResult(200, '根据id删除就业政策成功了！', result));
        }
    });
});

module.exports = router;