const config = require('../config/database-config');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sql-map/administrator');
// 引进认证部分所需的函数
const createToken = require('../authorization/create-token');
const retoken = require('../authorization/retoken');

const connection = mysql.createConnection(config);

connection.connect();

// 获取管理员的列表
router.get('/administrator', (req, res) => {
    let sql = $sql.select_all;
    connection.query(sql, [], (err, result) => {
        if(err) {
            res.json(formateResult(500, '获取管理员的列表失败了：' + err))
        }else {
            // res.json(formateResult(200, '获取管理员的列表成功了！', result));
            res.json(result);
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
            // res.json(formateResult(200, '获取指定id的管理员成功了！', result));
            res.json(result);
        }
    });
})

router.post('/administrator', (req, res) => {
    let sql_1 = $sql.add_item;
    let sql_2 = $sql.search_item;
    if(req.body.realname) {
        // 新增一条管理员信息
        connection.query(sql_1, [ req.body.username, req.body.realname, req.body.password ], (err, result) => {
            if(err) {
                res.json(formateResult(500, '新增一条管理员失败了：' + err));
            }else {
                // 签发token
                let token = createToken(req);
                result[0].token = token;
                res.json(result);
                // res.json(formateResult(200, '新增一条管理员成功了！', result));
            }
        });
    }else {
        // 根据用户名和密码，查找用户
        connection.query(sql_2, [ req.body.username, req.body.password ], (err, result) => {
            if(err) {
                res.json(formateResult(500, '根据用户名，密码，查找管理员信息失败了：' + err));
            }else {
                if(result.length >=1 ) {
                    // 签发token
                    let token = createToken(req);
                    result[0].token = token;
                    // res.json(formateResult(200, '根据用户名，密码，查找管理员信息成功了！', result));
                    res.json(result);
                }else {
                    res.json(formateResult(500, '根据用户名，密码，查找管理员信息失败了，该用户不存在!'));
                }
            }
        });
    }
    
});

// 根据id更新管理员：此功能需要登录，且验证用户为管理员
router.put('/administrator/:id', (req, res) => {
    let sql_1 = $sql.update_by_id;
    let sql_2 = $sql.update_password_by_id;
    let sql_3 = $sql.search_item;
    let user = retoken(req, res);
    // console.log(user);
    connection.query(sql_3, [ user.username, user.password ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '验证登录用户是否为管理员的操作失败了！'));
        }else {
            if(result.length >= 1) {
                if(req.body.username) {
                    connection.query(sql_1, [ req.body.username, req.body.realname, req.body.password, req.params['id'] ], (err, result) => {
                        if(err) {
                            res.json(formateResult(500, '根据id更新管理员失败了：' + err));
                        }else {
                            // res.json(formateResult(200, '根据id更新管理员成功了！', result));
                            // 签发token
                            req.body.password = user.password;
                            let token = createToken(req);
                            res.json({ token: token });
                        }
                    });
                }else {
                    // 根据id更新管理员密码
                    connection.query(sql_2, [ req.body.password, req.params['id'] ], (err, result) => {
                        if(err) {
                            res.json(formateResult(500, '根据id更新管理员密码失败了：' + err));
                        }else {
                            // res.json(formateResult(200, '根据id更新管理员密码成功了！', result));
                            // 签发token
                            req.body.username = user.username;
                            let token = createToken(req);
                            res.json({ token: token });
                        }
                    });
                }
            }else {
                res.json(formateResult(401, '您不具有进行更新该管理员信息操作的权限！'));
            }
        }
    });
});

// 根据id删除管理员：此功能需要用户登录，并且验证用户为管理员
router.delete('/administrator/:id', (req, res) => {
    let sql = $sql.detele_item;
    let sql_admin = $sql_admin.select_by_username;
    let user = retoken(req, res);
    connection.query(sql_admin, [ user.username ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '验证登录用户是否为管理员的操作失败了！'));
        }else {
            if(result.length >= 1) {
                connection.query(sql, [ req.params['id'] ], (err, result) => {
                    if(err) {
                        res.json(formateResult(500, '根据id删除管理员失败了：' + err));
                    }else {
                        res.json(formateResult(200, '根据id删除管理员成功了！', result));
                    }
                });
            }else {
                res.json(formateResult(401, '您不具有进行删除该公司信息操作的权限！'));
            }
        }
    });
});

module.exports = router;