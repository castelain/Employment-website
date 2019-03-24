const express = require('express');
const app = express();
const home = require('./home');

app.use('/', home);

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});