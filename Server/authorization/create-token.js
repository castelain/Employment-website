// 用于用户认证部分的功能函数

const jwt = require('jsonwebtoken');

// 签发token
function createToken(req) {
    // 生成token
    const userToken = {
        "username": req.body.username,
        "password": req.body.password,
        "loginAt": new Date()
    };
    // 签发token，指定过期时间为2h
    const token = jwt.sign(userToken, jwtTokenSecret, { expiresIn: '2h' });
    return token;
}

module.exports = createToken;