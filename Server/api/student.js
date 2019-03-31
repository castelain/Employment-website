const config = require('../config/database-config');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sql-map/student');
const $sql_admin = require('../sql-map/administrator');
// 引进认证部分所需的函数
const createToken = require('../authorization/create-token');
const retoken = require('../authorization/retoken');

const connection = mysql.createConnection(config);

connection.connect();

router.get('/student', (req, res) => {
    let sql_1 = $sql.select_all;
    let sql_2 = $sql.select_by_keyword;
    let keyword = req.query.keyword;
    if(!keyword) {
        // 获取学生信息的列表
        connection.query(sql_1, [], (err, result) => {
            if(err) {
                res.json(formateResult(500, '获取学生信息的列表失败了：' + err))
            }else {
                res.json(formateResult(200, '获取学生信息的列表成功了！', result));
            }
        });
    }else {
        // 根据输入的关键字，查询学生信息
        connection.query(sql_2, [ req.query.keyword, req.query.keyword, req.query.keyword, req.query.keyword, req.query.keyword, ], (err, result) => {
            if(err) {
                res.json(formateResult(500, '根据关键字查找学生信息失败了：' + err));
            }else {
                res.json(formateResult(200,  '根据关键字查找学生信息成功了！', result));
            }
        });
    }
    
});

// 获取指定id的学生信息
router.get('/student/:id', (req, res) => {
    let sql = $sql.select_by_id;
    connection.query(sql, [ req.params['id'] ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取指定id的学生信息失败了：' + err));
        }else {
            res.json(formateResult(200, '获取指定id的学生信息成功了！', result));
        }
    });
});

router.post('/student', (req, res) => {
    let sql_1 = $sql.add_item;
    let sql_2 = $sql.search_item;
    // console.log(req.body);
    if(req.body.realname) {
        // 新增一条学生信息
        connection.query(sql_1, [ req.body.username, req.body.realname, req.body.password, req.body.school, req.body.college, req.body.major ], (err, result) => {
            if(err) {
                res.json(formateResult(500, '新增一条学生信息失败了：' + err));
            }else {
                // 签发token
                let token = createToken(req);
                result.token = token;
                res.json(formateResult(200, '新增一条学生信息成功了！', result));
                // res.json(result);
            }
        });
    }else {
        // 根据用户名和密码，查找用户
        connection.query(sql_2, [ req.body.username, req.body.password ], (err, result) => {
            if(err) {
                res.json(formateResult(500, '根据用户名，密码，查找学生信息失败了：' + err));
            }else {
                if(result.length >=1 ) {
                    // console.log(result);
                    res.json(formateResult(200, '根据用户名，密码，查找学生信息成功了！', result));
                }else {
                    res.json(formateResult(500, '根据用户名，密码，查找学生信息失败了，该用户不存在!'));
                }
            }
        });
    }
});

// 更新学生信息：此功能需要登录，且验证用户为学生
router.put('/student/:id', (req, res) => {
    let sql_1 = $sql.update_password;
    let sql_2 = $sql.update_by_id;
    let sql_3 = $sql.select_by_username;
    let user = retoken(req, res);
    connection.query(sql_3, [ user.body.username ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '验证登录用户是否为学生的操作失败了！'));
        }else {
            if(result.length >= 1) {
                // 解析出的信息说明用户为学生，可进行更新信息的操作
                if(req.body.username) {
                    // 根据id更新学生全部信息
                    connection.query(sql_2, [ req.body.username, req.body.realname, req.body.password, req.body.school, req.body.college, req.body.major, req.params['id'] ], (err, result) => {
                        if(err) {
                            res.json(formateResult(500, '根据id更新学生信息失败了：' + err));
                        }else {
                            res.json(formateResult(200, '根据id更新学生信息成功了！', result));
                        }
                    });
                }else {
                    // 修改指定id学生的密码
                    connection.query(sql_1, [ req.body.password, req.params['id'] ], (err, result) => {
                        if(err) {
                            res.json(formateResult(500, '修改指定id学生的密码失败了：' + err));
                        }else {
                            res.json(formateResult(200, '修改指定id学生的密码成功了！', result));
                        }
                    });
                }
            }else {
                res.json(formateResult(401, '您不具有进行更新该学生信息操作的权限！'));
            }
        }
    });
});

// 根据id删除学生信息：此功能需要用户登录，并且验证用户为管理员
router.delete('/student/:id', (req, res) => {
    let sql = $sql.detele_item;
    let sql_admin = $sql_admin.select_by_username;
    let user = retoken(req, res);
    connection.query(sql_admin, [ user.body.username ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '验证登录用户是否为管理员的操作失败了！'));
        }else {
            if(result.length >= 1){
                connection.query(sql, [ req.params['id'] ], (err, result) => {
                    if(err) {
                        res.json(formateResult(500, '根据id删除学生信息失败了：' + err));
                    }else {
                        res.json(formateResult(200, '根据id删除学生信息成功了！', result));
                    }
                });
            }else {
                res.json(formateResult(401, '您不具有进行删除该学生信息操作的权限！'));
            }
        }
    });
});

module.exports = router;