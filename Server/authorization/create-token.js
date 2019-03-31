// 用于用户认证部分的功能函数

const jwt = require('jsonwebtoken');

// 秘钥
const jwtTokenSecret = 'jasmine';

// 签发token
function createToken(req) {
    // 生成token
    const userToken = {
        "username": req.body.username,
        "password": req.body.password,
        "loginAt": new Date()
    };
    // 签发token，指定过期时间为2d
    const token = jwt.sign(userToken, jwtTokenSecret, { expiresIn: '2d' });
    return token;
}

module.exports = createToken;