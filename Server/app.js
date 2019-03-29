const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let user_router = require('./api/user-api');
let latest_notification_router = require('./api/latest_notification');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// 定义全局方法 
formateResult = function() {
    let result = {};
    if(arguments.length === 2){
        result = {
            code: arguments[0],
            msg: arguments[1]
        };
    }else if(arguments.length === 3){
        result = {
            code: arguments[0],
            msg: arguments[1],
            data: arguments[2]
        }
    }
    return result;
}

app.use('/', user_router);
app.use('/', latest_notification_router);

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});