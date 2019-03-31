// 用于用户认证部分的功能函数

const jwt = require('jsonwebtoken');

// 秘钥
const jwtTokenSecret = 'jasmine';

// 验证 token
// (判断是否有token，以及token是否正确和是否过期)
function retoken(req, res) {
    // 获取到请求头部带着的token
    const token = req.headers.authorization;
    
    // 需要验证，但没有token，返回401
    if(!token) {
        return res.json(formateResult(401, '此功能需要登录：没有token！'));
    }
    // 需要验证，有token，验证token是否正确以及是否过期
    jwt.verify(token, jwtTokenSecret, (err, decoded) => {
        if(err) {
            return res.json(formateResult(401, '此功能需要登录：token不正确或者已过期！' + err.msg));
        }else {
            // 通过验证，返回解析出的信息
            return decoded;
        }
    });
}


module.exports = retoken;