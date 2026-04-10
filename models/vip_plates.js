const pool = require('../config/db');
const addVipPlate = async (body) => {
    let sql = 'INSERT INTO vip_plates (plate_number,discount_percentage) VALUES (? , ?)';
    const [result] = await pool.query(sql, [body.plate_number, body.discount]);
    // console.log(result);
    return result.insertId;
}
const getById = async (id) => {
    let sql = 'SELECT id,plate_number,discount_percentage,is_active FROM vip_plates WHERE id = ?'
    const [result] = await pool.query(sql, [id]);
    return result[0];
}
const getByPlate = async (body) => {
    let sql = 'SELECT id, plate_number,discount_percentage FROM vip_plates WHERE plate_number = ? AND is_active = ?';
    const [result] = await pool.query(sql, [body, 1]);
    // console.log(result);    
    return result;
}
const statusInactive = async (id) => {
    let sql = 'UPDATE vip_plates SET is_active = 1 WHERE id = ?';
    await pool.query(sql, [id]);
}
const statusUnactive = async (id) => {
    let sql = 'UPDATE vip_plates SET is_active = 0 WHERE id = ?';
    await pool.query(sql, [id]);
}
const getAllVip = async ()=>{
    const [result] = await pool.query('SELECT id,plate_number,discount_percentage,is_active FROM vip_plates');
    return result;
}
module.exports = {
    addVipPlate,
    getById,
    getByPlate,
    statusInactive,
    statusUnactive,
    getAllVip
    
}