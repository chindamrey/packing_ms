const platePattern = /^([0-9])([A-Z]{1,2})-([0-9]{4})$/;
const isValidPlate = (plate) =>{
   return platePattern.test(plate);
}
module.exports={
    isValidPlate
}