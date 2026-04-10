const platePattern = /^([0-9])([A-Z]{1,2})-([0-9]{4})$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const isValidPlate = (plate) => {
    return platePattern.test(plate);
}
const isValidEmail = (email) =>{
    return emailRegex.test(email)
}
const isValidPassword = (pass)=>{
    return passwordRegex.test(pass);
}
module.exports = {
    isValidPlate,
    isValidEmail,
    isValidPassword
}