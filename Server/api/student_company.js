const config = require('../config/database-config');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sql-map/student_company');

const connection = mysql.createConnection(config);

connection.connect();

// 获取留言的列表
router.get('/student_company', (req, res) => {
    let sql = $sql.select_all;
    connection.query(sql, [], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取留言的列表失败了：' + err))
        }else {
            // res.json(formateResult(200, '获取留言的列表成功了！', result));
            res.json(result);
        }
    });
    
});

// 获取所有学生给指定company_id公司的留言
router.get('/student_company/to_company/:company_id', (req, res) => {
    let sql = $sql.select_to_company;
    connection.query(sql, [ req.params['company_id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取所有学生给指定company_id公司的留言失败了：' + err));
        }else {
            // res.json(formateResult(200, '获取所有学生给指定company_id公司的留言成功了！', result));
            res.json(result);
        }
    });
});

// 获取所有公司给指定student_id学生的留言
router.get('/student_company/to_student/:student_id', (req, res) => {
    let sql = $sql.select_to_student;
    connection.query(sql, [ req.params['student_id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取所有公司给指定student_id学生的留言失败了：' + err));
        }else {
            // res.json(formateResult(200, '获取所有公司给指定student_id学生的留言成功了！', result));
            res.json(result);
            
        }
    });
});

// 指定student_id的学生给指定company_id的企业留言
router.post('/student_company/to_company', (req, res) => {
    let sql = $sql.add_to_company;
    connection.query(sql, [ req.body.student_id, req.body.company_id, req.body.message ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '指定student_id的学生给指定company_id的企业留言失败了：' + err));
        }else {
            res.json(formateResult(200, '指定student_id的学生给指定company_id的企业留言成功了！', result));
        }
    });
});

// 指定company_id的企业给指定student_id的学生留言
router.post('/student_company/to_student', (req, res) => {
    let sql = $sql.add_to_student;
    connection.query(sql, [ req.body.student_id, req.body.company_id, req.body.message ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '指定company_id的企业给指定student_id的学生留言失败了：' + err));
        }else {
            res.json(formateResult(200, '指定company_id的企业给指定student_id的学生留言成功了！', result));
        }
    });
});

// 根据id删除留言
router.delete('/student_company/:id', (req, res) => {
    let sql = $sql.detele_item;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据id删除留言失败了：' + err));
        }else {
            res.json(formateResult(200, '根据id删除留言成功了！', result));
        }
    });
});

module.exports = router;