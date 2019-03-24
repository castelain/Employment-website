const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// 引入数据库的相关配置
const config = require('./config/database-config');
const home = require('./route/home');

// 数据库配置
const mysql = require('mysql');
const connection = mysql.createConnection(config);

connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api/user', userApi);

app.use('/', user-router);

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});