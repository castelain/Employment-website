const config = require('../config/database-config');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sql-map/seminar');

const connection = mysql.createConnection(config);

connection.connect();

router.get('/seminar', (req, res) => {
    let sql_1 = $sql.select_all;
    let sql_2 = $sql.select_by_keyword;
    let keyword = req.query.keyword;
    if(!keyword) {
        // 获取宣讲会信息的列表
        connection.query(sql_1, [], (err, result) => {
            if(err) {
                res.json(formateResult(500, '获取宣讲会信息的列表失败了：' + err))
            }else {
                res.json(formateResult(200, '获取宣讲会信息的列表成功了！', result));
            }
        });
    }else {
        // 根据输入的关键字，查询宣讲会信息
        connection.query(sql_2, [ req.query.keyword, req.query.keyword, req.query.keyword ], (err, result) => {
            if(err) {
                res.json(formateResult(500, '根据关键字查找宣讲会信息失败了：' + err));
            }else {
                res.json(formateResult(200,  '根据关键字查找宣讲会信息成功了！', result));
            }
        });
    }
    
});

// 获取指定id的宣讲会信息
router.get('/seminar/:id', (req, res) => {
    let sql = $sql.select_by_id;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取指定id的宣讲会信息失败了：' + err));
        }else {
            res.json(formateResult(200, '获取指定id的宣讲会信息成功了！', result));
        }
    });
})

// 获取指定company_id的宣讲会信息
router.get('/company/:id/seminar', (req, res) => {
    let sql = $sql.select_by_companyId;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取指定company_id的宣讲会信息失败了：' + err));
        }else {
            res.json(formateResult(200, '获取指定company_id的宣讲会信息成功了！', result));
        }
    });
})


// 新增一条宣讲会信息
router.post('/seminar', (req, res) => {
    let sql = $sql.add_item;
    connection.query(sql, [ req.body.company_id, req.body.holds_in, req.body.address, req.body.majors, req.body.company_description, req.body.salary_description, req.body.application_process ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '新增一条宣讲会信息失败了：' + err));
        }else {
            res.json(formateResult(200, '新增一条宣讲会信息成功了！', result));
        }
    });
});

// 修改指定id宣讲会的状态
router.post('/seminar/:id', (req, res) => {
    let sql = $sql.update_status;
    connection.query(sql, [ req.body.status, req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '修改指定id宣讲会的状态失败了：' + err));
        }else {
            res.json(formateResult(200, '修改指定id宣讲会的状态成功了！', result));
        }
    });
});

// 根据id更新宣讲会信息
router.put('/seminar/:id', (req, res) => {
    let sql = $sql.update_by_id;
    connection.query(sql, [ req.body.company_id, req.body.holds_in, req.body.address, req.body.majors, req.body.company_description, req.body.salary_description, req.body.application_process, req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据id更新宣讲会信息失败了：' + err));
        }else {
            res.json(formateResult(200, '根据id更新宣讲会信息成功了！', result));
        }
    });
});

// 根据id删除宣讲会信息
router.delete('/seminar/:id', (req, res) => {
    let sql = $sql.delele_by_id;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据id删除宣讲会信息失败了：' + err));
        }else {
            res.json(formateResult(200, '根据id删除宣讲会信息成功了！', result));
        }
    });
});

// 根据company_id删除宣讲会信息
router.delete('/company/:id/seminar', (req, res) => {
    let sql = $sql.delete_by_companyId;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据company_id删除宣讲会信息失败了：' + err));
        }else {
            res.json(formateResult(200, '根据company_id删除宣讲会信息成功了！', result));
        }
    });
});

module.exports = router;