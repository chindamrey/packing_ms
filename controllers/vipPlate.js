const vipPlates = require('../services/vipPlate');

const addVipPlate = async (req, res) => {
    try {
        const result = await vipPlates.addVipPlate(req.body);
        return res.json({
            result: true,
            msg: "Add New VIP Plate Successfully",
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
const activeStatus = async (req, res) => {
    try {
        const result = await vipPlates.statusInactive(req.params.id);
        return res.json({
            result:true,
            msg:"Change Status to Active Successfully",
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
const unActiveStatus = async (req, res) => {
    try {
        const result = await vipPlates.statusUnactive(req.params.id);
        return res.json({
            result:true,
            msg:"Change Status to Unactive Successfully",
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
const getAllVip = async(req,res)=>{
    try {
        const result = await vipPlates.getAllVip();
        return res.json({
            result:true,
            msg:"Get All VIP Plates Successfully",
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
    addVipPlate,
    activeStatus,
    unActiveStatus,
    getAllVip
}