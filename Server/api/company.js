const config = require('../config/database-config');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sql-map/company');
const $sql_admin = require('../sql-map/administrator');
// 引进认证部分所需的函数
const createToken = require('../authorization/create-token');
const retoken = require('../authorization/retoken');

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

router.post('/company', (req, res) => {
    let sql_1 = $sql.add_item;
    let sql_2 = $sql.search_item;
    if(req.body.name) {
        // 新增一条公司信息
        connection.query(sql_1, [ req.body.username, req.body.name, req.body.kind, req.body.address, req.body.scale, req.body.email, req.body.link_man, req.body.link_man_tel, req.body.password ], (err, result) => {
            if(err) {
                res.json(formateResult(500, '新增一条公司信息失败了：' + err));
            }else {
                 // 签发token
                 let token = createToken(req);
                 result[0].token = token;
                 res.json(result);
                // res.json(formateResult(200, '新增一条公司信息成功了！', result));
            }
        });
    }else {
        // 根据用户名和密码，查找用户
        connection.query(sql_2, [ req.body.username, req.body.password ], (err, result) => {
            if(err) {
                res.json(formateResult(500, '根据用户名，密码，查找公司信息失败了：' + err));
            }else {
                if(result.length >=1 ) {
                    // console.log(result);
                    // 签发token
                    let token = createToken(req);
                    result[0].token = token;
                    // res.json(formateResult(200, '根据用户名，密码，查找公司信息成功了！', result));
                    res.json(result);
                }else {
                    res.json(formateResult(500, '根据用户名，密码，查找公司信息失败了，该用户不存在!'));
                }
            }
        });
    }
    
});

// 修改指定id公司的信息：此功能需要登录，且验证用户为公司
router.put('/company/:id', (req, res) => {
    let sql_1 = $sql.update_password;
    let sql_2 = $sql.update_by_id;
    let sql_3 = $sql.search_item;
    // console.log('before retoken');
    let user = retoken(req, res);
    // console.log('user: ' + user.username + ' password: ' + user.password);
    connection.query(sql_3, [ user.username, user.password ], (err, result) => {
        if(err) {
            res.json(formateResult(500, '验证登录用户是否为公司的操作失败了！' + err));
        }else {
            // console.log('result.length:' + result.length);
            if(result.length >= 1) {
                // console.log('result.length >= 1');
                // 解析出的信息说明用户为公司，可进行更新信息的操作
                if(req.body.username) {
                    // 根据id，更新公司的全部信息
                    connection.query(sql_2, [ req.body.username, req.body.name, req.body.kind, req.body.address, req.body.scale, req.body.email, req.body.link_man, req.body.link_man_tel, req.body.password , req.params['id'] ], (err, result) => {
                        if(err) {
                            res.json(formateResult(500, '根据id更新公司信息失败了：' + err));
                        }else {
                            // 签发token
                            req.body.password = user.password;
                            let token = createToken(req);
                            res.json({ token: token });
                            // res.json(formateResult(200, '根据id更新公司信息成功了！', result));
                        }
                    });
                }else {
                    // 修改指定id公司的密码
                    connection.query(sql_1, [ req.body.password, req.params['id'] ], (err, result) => {
                        if(err) {
                            res.json(formateResult(500, '修改指定id公司的密码失败了：' + err));
                        }else {
                                // 签发token
                                req.body.username = user.username;
                                let token = createToken(req);
                                res.json({ token: token });
                        }
                    });
                }
            }else {
                // console.log('result.length < 1');
                res.json(formateResult(401, '您不具有进行更新该公司信息操作的权限！'));
            }
        }
    });
});

// 根据id删除公司信息：此功能需要用户登录，并且验证用户为管理员
router.delete('/company/:id', (req, res) => {
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
                        res.json(formateResult(500, '根据id删除公司信息失败了：' + err));
                    }else {
                        res.json(formateResult(200, '根据id删除公司信息成功了！', result));
                    }
                });
            }else {
                res.json(formateResult(401, '您不具有进行删除该公司信息操作的权限！'));
            }
        }
    });
});

module.exports = router;