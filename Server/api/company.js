const config = require('../config/database-config');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sql-map/company');

const connection = mysql.createConnection(config);

connection.connect();

router.get('/company', (req, res) => {
    let sql_1 = $sql.select_all;
    let sql_2 = $sql.select_by_keyword;
    let keyword = req.query.keyword;
    if(!keyword) {
        // 获取公司信息的列表
        connection.query(sql_1, [], (err, result) => {
            if(err) {
                res.json(formateResult(500, '获取公司信息的列表失败了：' + err))
            }else {
                res.json(formateResult(200, '获取公司信息的列表成功了！', result));
            }
        });
    }else {
        // 根据输入的关键字，查询公司信息
        connection.query(sql_2, [ req.query.keyword, req.query.keyword, req.query.keyword, req.query.keyword, req.query.keyword, req.query.keyword,req.query.keyword,req.query.keyword,req.query.keyword, ], (err, result) => {
            if(err) {
                res.json(formateResult(500, '根据关键字查找公司信息失败了：' + err));
            }else {
                res.json(formateResult(200,  '根据关键字查找公司信息成功了！', result));
            }
        });
    }
    
});

// 获取指定id的公司信息
router.get('/company/:id', (req, res) => {
    let sql = $sql.select_by_id;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取指定id的公司信息失败了：' + err));
        }else {
            res.json(formateResult(200, '获取指定id的公司信息成功了！', result));
        }
    });
})

// 新增一条公司信息
router.post('/company', (req, res) => {
    let sql = $sql.add_item;
    connection.query(sql, [ req.body.username, req.body.name, req.body.kind, req.body.address, req.body.scale, req.body.email, req.body.link_man, req.body.link_man_tel, req.body.password ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '新增一条公司信息失败了：' + err));
        }else {
            res.json(formateResult(200, '新增一条公司信息成功了！', result));
        }
    });
});

// 修改指定id公司的密码
router.post('/company/:id', (req, res) => {
    let sql = $sql.update_password;
    connection.query(sql, [ req.body.password, req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '修改指定id公司的密码失败了：' + err));
        }else {
            res.json(formateResult(200, '修改指定id公司的密码成功了！', result));
        }
    });
});

// 根据id更新公司信息
router.put('/company/:id', (req, res) => {
    let sql = $sql.update_by_id;
    connection.query(sql, [ req.body.username, req.body.name, req.body.kind, req.body.address, req.body.scale, req.body.email, req.body.link_man, req.body.link_man_tel, req.body.password , req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据id更新公司信息失败了：' + err));
        }else {
            res.json(formateResult(200, '根据id更新公司信息成功了！', result));
        }
    });
});

// 根据id删除公司信息
router.delete('/company/:id', (req, res) => {
    let sql = $sql.detele_item;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据id删除公司信息失败了：' + err));
        }else {
            res.json(formateResult(200, '根据id删除公司信息成功了！', result));
        }
    });
});

module.exports = router;