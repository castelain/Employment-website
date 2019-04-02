const config = require('../config/database-config');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sql-map/school_college');

const connection = mysql.createConnection(config);

connection.connect();

// 获取学校学院的列表
router.get('/school_college', (req, res) => {
    let sql = $sql.select_all;
    connection.query(sql, [], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取学校学院的列表失败了：' + err))
        }else {
            // res.json(formateResult(200, '获取学校学院的列表成功了！', result));
            res.json(result);
        }
    });
});

// 获取指定id的学校学院
router.get('/school_college/:id', (req, res) => {
    let sql = $sql.select_by_id;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取指定id的学校学院失败了：' + err));
        }else {
            // res.json(formateResult(200, '获取指定id的学校学院成功了！', result));
            res.json(result);
        }
    });
})

// 新增一条学校学院
router.post('/school_college', (req, res) => {
    let sql = $sql.add_item;
    connection.query(sql, [ req.body.title, req.body.majors, req.body.content ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '新增一条学校学院失败了：' + err));
        }else {
            res.json(formateResult(200, '新增一条学校学院成功了！', result));
        }
    });
});

// 根据id更新学校学院
router.put('/school_college/:id', (req, res) => {
    let sql = $sql.update_by_id;
    connection.query(sql, [ req.body.title, req.body.majors, req.body.content, req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据id更新学校学院失败了：' + err));
        }else {
            res.json(formateResult(200, '根据id更新学校学院成功了！', result));
        }
    });
});

// 根据id删除学校学院
router.delete('/school_college/:id', (req, res) => {
    let sql = $sql.detele_item;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据id删除学校学院失败了：' + err));
        }else {
            res.json(formateResult(200, '根据id删除学校学院成功了！', result));
        }
    });
});

module.exports = router;