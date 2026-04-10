const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const users = require('../models/users')

const isLogin = async (req, res, next) => {
    try {
        let header = req.headers.authorization;
        if (!header) {
            return res.json({
                result: false,
                msg: "You need to login"
            })
        }
        let parts = header.split(' ');
        if (parts[0] !== 'Bearer' || parts.length !== 2) {
            return res.json({
                result: false,
                msg: 'Invalid token'
            })
        }
        let token = parts[1];
        let decode = jwt.verify(token, jwtConfig.secret);
        let userInfo = await users.findByToken(token);
        if(userInfo.length == 0){
            throw new Error('Invalid Token or Expired');
        }
        req.user = decode;
        next();
    } catch (e) {
        console.log(e);
        return res.json({
                result: false,
                msg: 'Invalid token or Expire'
            })
    }

}
module.exports = {
    isLogin
}