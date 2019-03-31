const config = require('../config/database-config');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sql-map/administrator');

const connection = mysql.createConnection(config);

connection.connect();

// 获取管理员的列表
router.get('/administrator', (req, res) => {
    let sql = $sql.select_all;
    connection.query(sql, [], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取管理员的列表失败了：' + err))
        }else {
            res.json(formateResult(200, '获取管理员的列表成功了！', result));
        }
    });
    
});

// 获取指定id的管理员
router.get('/administrator/:id', (req, res) => {
    let sql = $sql.select_by_id;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取指定id的管理员失败了：' + err));
        }else {
            res.json(formateResult(200, '获取指定id的管理员成功了！', result));
        }
    });
})

// 新增一条管理员
router.post('/administrator', (req, res) => {
    let sql = $sql.add_item;
    connection.query(sql, [ req.body.username, req.body.realname, req.body.password ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '新增一条管理员失败了：' + err));
        }else {
            res.json(formateResult(200, '新增一条管理员成功了！', result));
        }
    });
});

// 根据id更新管理员
router.put('/administrator/:id', (req, res) => {
    let sql_1 = $sql.update_by_id;
    let sql_2 = $sql.update_password_by_id;
    if(req.body.username) {
        connection.query(sql_1, [ req.body.username, req.body.realname, req.body.password, req.params['id'] ], (err, result) => {
            if(err) {
                res.json(formateResult(500, '根据id更新管理员失败了：' + err));
            }else {
                res.json(formateResult(200, '根据id更新管理员成功了！', result));
            }
        });
    }else {
        // 根据id更新管理员密码
        connection.query(sql_2, [ req.body.password, req.params['id'] ], (err, result) => {
            if(err) {
                res.json(formateResult(500, '根据id更新管理员密码失败了：' + err));
            }else {
                res.json(formateResult(200, '根据id更新管理员密码成功了！', result));
            }
        });
    }
});

// 根据id删除管理员
router.delete('/administrator/:id', (req, res) => {
    let sql = $sql.detele_item;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据id删除管理员失败了：' + err));
        }else {
            res.json(formateResult(200, '根据id删除管理员成功了！', result));
        }
    });
});

module.exports = router;