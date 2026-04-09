const pool = require('../config/db');

const entry = async (body) => {
    let sql = 'INSERT INTO packing_logs (plate_number,entry_time,vip_plate_id) VALUES (?,?,?)';
    const [result] = await pool.query(sql, [body.plate_number, body.entry_time,body.vip_plate_id]);
    return result.insertId;
}
const getAllPlates = async () => {
    const [result] = await pool.query('SELECT p.plate_number,p.entry_time,p.exit_time,p.status,if(v.is_active > 0 ,1,0) as isVip FROM packing_logs p left join vip_plates v on p.vip_plate_id = v.id where status = ?', ['IN']);
    let [count] = await pool.query("SELECT count(id) as total FROM packing_logs WHERE status = ?", ['IN']);
    return {
        car_info: result,
        total: count[0].total,
        slot_limit: await getSlotLimit()
    };
}
const getAllExitPlates = async () => {
    const [result] = await pool.query('SELECT plate_number,entry_time,exit_time,status FROM packing_logs where status = ?', ['OUT']);
    let [count] = await pool.query('SELECT count(id) as total FROM packing_logs WHERE status = ? ', ['OUT']);
    return { car_info: result, total: count[0].total };
}
const getByPlate = async (body) => {
    let sql = 'SELECT id, plate_number FROM packing_logs where plate_number = ? AND status = ?';
    const [result] = await pool.query(sql, [body, 'IN']);
    // console.log(result);    
    return result;
}
const exitPacking = async (plate, time, id) => {
    let sql = 'UPDATE packing_logs SET status = ?,exit_time = ? where plate_number = ? and status = ? and id = ?';
    let result = await pool.query(sql, ['OUT', time, plate, 'IN', id]);
    const [getByPlate] = await pool.query('SELECT plate_number,entry_time,exit_time,status FROM packing_logs where plate_number = ? AND status = ? AND id = ?', [plate, 'OUT', id]);
    return getByPlate[0];
}
const getById = async (id) => {
    const [result] = await pool.query('SELECT * FROM packing_logs WHERE id = ?', [id]);
    return result[0];
}
const prices = async () => {
    const [result] = await pool.query('SELECT * FROM price_rules');
    return result;
}
const getSlotLimit = async () => {
    const [limit] = await pool.query('SELECT total_slot FROM slots_limit ORDER BY id DESC LIMIT 1');
    return limit[0].total_slot;
}
module.exports = {
    entry,
    getAllPlates,
    getByPlate,
    exitPacking,
    getById,
    prices,
    getAllExitPlates,
    getSlotLimit
}