const config = require('../config/database-config');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sql-map/career_assessment');

const connection = mysql.createConnection(config);

connection.connect();

// 获取职业评测的列表
router.get('/career_assessment', (req, res) => {
    let sql = $sql.select_all;
    connection.query(sql, [], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取职业评测的列表失败了：' + err))
        }else {
            res.json(formateResult(200, '获取职业评测的列表成功了！', result));
        }
    });
});

// 获取指定id的职业评测
router.get('/career_assessment/:id', (req, res) => {
    let sql = $sql.select_by_id;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取指定id的职业评测失败了：' + err));
        }else {
            res.json(formateResult(200, '获取指定id的职业评测成功了！', result));
        }
    });
})

// 新增一条职业评测
router.post('/career_assessment', (req, res) => {
    let sql = $sql.add_item;
    connection.query(sql, [ req.body.title, req.body.content ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '新增一条职业评测失败了：' + err));
        }else {
            res.json(formateResult(200, '新增一条职业评测成功了！', result));
        }
    });
});

// 根据id更新职业评测
router.put('/career_assessment/:id', (req, res) => {
    let sql = $sql.update_by_id;
    connection.query(sql, [ req.body.title, req.body.content, req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据id更新职业评测失败了：' + err));
        }else {
            res.json(formateResult(200, '根据id更新职业评测成功了！', result));
        }
    });
});

// 根据id删除职业评测
router.delete('/career_assessment/:id', (req, res) => {
    let sql = $sql.detele_item;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据id删除职业评测失败了：' + err));
        }else {
            res.json(formateResult(200, '根据id删除职业评测成功了！', result));
        }
    });
});

module.exports = router;