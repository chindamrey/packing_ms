const vip_plates = require('../models/vip_plates');
const plateValidator = require('../utils/validator');


const addVipPlate = async (body) => {
    let isValid = plateValidator.isValidPlate(body.plate_number);
    if (!isValid) {
        throw new Error('Plate Number is Invalid');
    }
    let isExits = await vip_plates.getByPlate(body.plate_number);
    if (isExits.length !== 0) {
        throw new Error('Plate Number is Already Exits! or is Active');
    }
    let result = await vip_plates.addVipPlate(body);
    return vip_plates.getById(result);
}
const statusInactive = async (id) => {
    let isActive = await vip_plates.getById(id);
    if(isActive.is_active == 1){
        throw new Error('Plate Number is Aleady Active!');
    }
    await vip_plates.statusInactive(id);
    const result = await vip_plates.getById(id);
    return result;
}
const statusUnactive = async (id) => {
    let isUnactive = await vip_plates.getById(id);
    if(isUnactive.is_active == 0){
        throw new Error('Plate Number is Aleady Unactive!');
    }
    await vip_plates.statusUnactive(id);
    const result = await vip_plates.getById(id);
    return result;
}
const getAllVip = async () => {
    const result = await vip_plates.getAllVip();
    return result;
}


module.exports = {
    addVipPlate,
    statusInactive,
    statusUnactive,
    getAllVip
}