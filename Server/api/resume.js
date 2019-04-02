const config = require('../config/database-config');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sql-map/resume');

const connection = mysql.createConnection(config);

connection.connect();

// 获取简历的列表
router.get('/resume', (req, res) => {
    let sql = $sql.select_all;
    connection.query(sql, [], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取简历的列表失败了：' + err))
        }else {
            // res.json(formateResult(200, '获取简历的列表成功了！', result));
            res.json(result);
        }
    });
    
});

// 获取指定student_id的简历的id
router.get('/resume/get-id/:student_id', (req, res) => {
    let sql = $sql.select_userId;
    connection.query(sql, [ req.params.student_id ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取指定student_id的简历的id：' + err));
        }else {
            res.json(result);
        }
    });
});

// 获取指定id的简历
router.get('/resume/:id', (req, res) => {
    let sql = $sql.select_by_id;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取指定id的简历失败了：' + err));
        }else {
            // res.json(formateResult(200, '获取指定id的简历成功了！', result));
            res.json(result);
        }
    });
})

// 新增一条简历
router.post('/resume', (req, res) => {
    let sql = $sql.add_item;
    connection.query(sql, [ req.body.student_id, req.body.email, req.body.sex, req.body.birthday, req.body.telephone, req.body.will_jobs, req.body.will_spots, req.body.will_salary, req.body.political_status, req.body.introduction, req.body.nationality, req.body.address, req.body.marry_status, req.body.awards, req.body.skills, req.body.experiences ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '新增一条简历失败了：' + err));
        }else {
            // res.json(formateResult(200, '新增一条简历成功了！', result));
            res.json(result);
        }
    });
});

// 根据id更新简历
router.put('/resume/:id', (req, res) => {
    let sql = $sql.update_by_id;
    connection.query(sql, [ req.body.email, req.body.sex, req.body.birthday, req.body.telephone, req.body.will_jobs, req.body.will_spots, req.body.will_salary, req.body.political_status, req.body.introduction, req.body.nationality, req.body.address, req.body.marry_status, req.body.awards, req.body.skills, req.body.experiences, req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据id更新简历失败了：' + err));
        }else {
            res.json(formateResult(200, '根据id更新简历成功了！', result));
        }
    });
});

// 根据id删除简历
router.delete('/resume/:id', (req, res) => {
    let sql = $sql.detele_item;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '根据id删除简历失败了：' + err));
        }else {
            res.json(formateResult(200, '根据id删除简历成功了！', result));
        }
    });
});

module.exports = router;