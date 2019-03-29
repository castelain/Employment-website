const config = require('../config/database-config');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../database/sql-map');

const connection = mysql.createConnection(config);

connection.connect();

let jsonWrite = function(res, ret){
    if(typeof ret === 'undefined'){
        res.send('err');
    }else{
        consolw.log(ret);
        res.send(ret);
    }
}

let dateStr = function (str) {
    return new Date(str.slice(0,7));
}

// 增加用户接口
router.post('/addUser', (req, res) => {
    let sql = $sql.user.add;
    let params = req.body;
    console.log(params);
    console.log(params.name);
    connection.query(sql, params, function(err, result){
        if(err){
            console.log('添加用户失败了： ', err);
        }else{
            jsonWrite(res, result);
        }
    })
});

// 查找用户接口
router.post('/login', (req, res) => {
    let sql_name = $sql.user.select_name;
    let params = req.body;
    if(params.name && params.password){
        connection.query(sql_name, [ params.name, params.password], function(err, result){
            if(err){
                console.log('登录操作查询数据库失败了: ', err);
            }else{
                if(result != null ){
                    jsonWrite(res, result);
                }else{
                    res.send('0');
                }
            }
        });
    }
});

// 更新用户信息
router.post('/updateUser', (req, res) => {
    let sql_update = $sql.user.update_user;
    let params = req.body;
    if(params.name){
        sql_update += "name = " + params.name + "'";
    }
    connection.query(sql_update, params.name, function(err, result) {
        if(err){
            console.log("更新用户失败了： ", err);
        }else{
            jsonWrite(res, result);
        }
    });
});

module.exports = router;
