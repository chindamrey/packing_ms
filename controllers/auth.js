const auth = require('../services/auth');

const register = async (req, res) => {
    try {
        const result = await auth.create(req.body);
        return res.json({
            result: true,
            msg: 'Register Successfully',
            data: result
        })
    } catch (e) {
        console.log(e);
        return res.json({
            result: false,
            msg: e.message
        })

    }
}
const login = async (req, res) => {
    try {
        const result = await auth.login(req.body);
        return res.json({
            result: true,
            msg: 'Login successfully',
            data: result
        })


    } catch (e) {
        console.log(e);
        return res.json({
            result: false,
            msg: e.message
        })
    }
};
const getMe = async (req, res) => {
    try {
        const result = await auth.getMe(req.user.id);
        return res.json({
            result: true,
            msg: 'Get your information successfully',
            data: result
        })

    } catch (e) {
        console.log(e);
        return res.json({
            result: false,
            msg: e.message
        })
    }
}
const logout = async (req, res) => {
    try {
        await auth.logout(req.user.id);
        return res.json({
            result:true,
            msg:'Logout successfully'
            
        })
    } catch (e) {
         console.log(e);
        return res.json({
            result: false,
            msg: e.message
        })
    }
}
module.exports = {
    register,
    login,
    getMe,
    logout
}