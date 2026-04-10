const pool = require('../config/db');


const createAccount = async (body) => {
    let sql = 'INSERT INTO users (full_name,email,password) VALUES (?,?,?)';
    const [result] = await pool.query(sql, [body.full_name, body.email, body.password]);
    return result.insertId;
}
const getByEmail = async (email) => {
    let sql = 'SELECT id,email,password FROM users WHERE email = ?';
    const [result] = await pool.query(sql, [email]);
    return result
}
const getById = async (id) => {
    let sql = 'SELECT id,full_name,email,token FROM users WHERE id = ?';
    const [result] = await pool.query(sql, [id]);
    return result;
}
const addToken = async (token, id) => {
    let sql = 'UPDATE users SET token = ? WHERE id = ?';
    await pool.query(sql, [token, id]);
}
const logout = async (id) => {
    let sql = 'UPDATE users SET token = null WHERE id = ?';
    const [result] = await pool.query(sql, [id]);
    return result;
}
const findByToken = async (id) => {
    let sql = 'SELECT id,full_name,email FROM users WHERE token = ? ';
    const [result] = await pool.query(sql, [id]);
    return result;
}
module.exports = {
    createAccount,
    getByEmail,
    getById,
    addToken,
    logout,
    findByToken
}