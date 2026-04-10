const auth = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const {isValidEmail,isValidPassword} = require('../utils/validator');


const create = async (body) => {
    let emailIsFormated = isValidEmail(body.email);
    if(!emailIsFormated){
        throw new Error('Email is not correct format')
    }
    let passwordIsFormated = isValidPassword(body.password);
    if(!passwordIsFormated){
        throw new Error('Password not Correct Format At least 8 characters,include uppercase or lowercase and one number');
    }
    const isEmailExit = await auth.getByEmail(body.email);
    if (isEmailExit.length > 0) {
        throw new Error('Email duplicate!');
    }
    let hashPassword = await bcrypt.hash(body.password, 10);
    const result = await auth.createAccount({
        full_name: body.full_name,
        email: body.email,
        password: hashPassword
    });
    let user = await auth.getById(result);
    return user[0];
}
const login = async (body) => {
    if (!body.email || !body.password) {
        throw new Error('Email and Password is Required!')

    }
    let userInfo = await auth.getByEmail(body.email);
    if(userInfo.length == 0){
        throw new Error('Email and Password Invalid!');
    }
    let isMatch = await bcrypt.compare(body.password,userInfo[0].password);
    if(!isMatch){
        throw new Error('Email and Password Invalid!');
    }
    let token = jwt.sign(
        {id:userInfo[0].id,email:userInfo[0].email},
        jwtConfig.secret,
        {expiresIn:jwtConfig.expireIn}
    )
    await auth.addToken(token,userInfo[0].id);
    let row = await auth.getById(userInfo[0].id);
    return row;
}
const getMe = async (id) => {
    const result = await auth.getById(id);
    return result;
}
const logout = async (id) => {
    const result = await auth.logout(id);
    return result;
}
module.exports = {
    create,
    login,
    getMe,
    logout
}