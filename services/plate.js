const packing_logs = require('../models/packing_logs');
const plateValidator = require('../utils/validator');
const calculate = require('../helpers/parking')
const dateTime = require('../utils/dateTime')
const vipPlate = require('../models/vip_plates');

const entry = async (body) => {
    let slotLimit = await packing_logs.getSlotLimit();


    let allCarInParking = await (await packing_logs.getAllPlates()).total;

    if (allCarInParking >= slotLimit) {
        throw new Error('Parking is full')
    }
    const isValid = plateValidator.isValidPlate(body.plate_number);
    if (!isValid) {
        throw new Error('Plate Number is Invalid for Cambodia Plate')
    }
    const row = await packing_logs.getByPlate(body.plate_number);
    if (row.length > 0) {
        throw new Error('Plate Number already exit')
    }
    let isVip = await vipPlate.getByPlate(body.plate_number);
    let vip_plate_id = null;
    if (isVip.length !== 0) {
        vip_plate_id = isVip[0].id;


    }
    const result = await packing_logs.entry({
        plate_number: body.plate_number,
        entry_time: body.entry_time,
        vip_plate_id: vip_plate_id
    });
    return packing_logs.getById(result);
}
const getAllPlates = async () => {
    const result = await packing_logs.getAllPlates();

    return result;
}
const exitPacking = async (plate, time) => {
    let discount = 0;
    const row = await packing_logs.getByPlate(plate);
    if (row.length == 0) {
        throw new Error('Car is not in packing!');
    }
    let isVip = await vipPlate.getByPlate(plate);
    if (isVip.length !== 0) {
        discount = isVip[0].discount_percentage;
    }

    const result = await packing_logs.exitPacking(plate, time, row[0].id);

    const durationPark = dateTime.getParkingHours(result.entry_time, result.exit_time);
    const prices = await packing_logs.prices();

    // ✅ Round up billable hours
    const billableHours = durationPark.hours + (durationPark.minutes > 0 || durationPark.seconds > 0 ? 1 : 0);
    console.log(discount);

    const fee = await calculate.calculateFee(billableHours, prices, discount);

    // console.log('fee:', fee, 'hour : ', billableHours);

    return {
        entry_info: result,
        duration: durationPark,
        billableHours,
        totalFee: fee.totalFee,
        discount: fee.discount,
        finalFee: fee.finalFee
    };
};
const getAllExitPlates = async () => {
    const result = await packing_logs.getAllExitPlates();
    return result;
}
module.exports = {
    entry,
    getAllPlates,
    exitPacking,
    getAllExitPlates
}