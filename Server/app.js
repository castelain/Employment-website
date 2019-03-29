const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let user_router = require('./api/user-api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/', user_router);

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});