const jwt = require('jsonwebtoken');

const isLogin = async (req, res, next) => {
    try {
        console.log(req.headers);
    } catch (e) {
        console.log(e);
        
    }

}
module.exports = {
    isLogin
}