const plate = require('../services/plate');
const {dateTime} = require('../utils/dateTime');

const entry = async (req, res) => {
    try {

        const result = await plate.entry(req.body);
        return res.json({
            result: true,
            msg: 'Successfully Entry',
            data: result
        })
    }
    catch (e) {
        console.log(e);
        return res.json({
            result: false,
            msg: e.message
        })
    }
}
const getAllPlates = async (req, res) => {
    try {
        const result = await plate.getAllPlates();
        return res.json({
            result: true,
            msg: 'Get All Plate Successful',
            data: result
        })
    }
    catch (e) {
        console.log(e);
        return res.json({
            result: false,
            msg: 'Internal Serve Error'
        })
    }
}
const exitPacking = async (req, res) => {
    try {
        const result = await plate.exitPacking(req.body.plate_number, dateTime());
        return res.json({
            result: true,
            msg: 'Car exit successfuly',
            data:result
        })
    }
    catch (e) {
        console.log(e);
        return res.json({
            result: false,
            msg: e.message
        })
    }

}
const getByPlate = async (req, res) => {
    try {

    }
    catch (e) {
        console.log(e);
        return res.json({
            result: false,
            msg: e.message
        })
    }
}
const allExitPlates = async(req,res)=>{
    try {
        const result = await plate.getAllExitPlates();
        return res.json({
            result :true,
            msg:'Get All Exit Car Successfully',
            data:result
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
    entry,
    getAllPlates,
    exitPacking,
    getByPlate,
    allExitPlates
}