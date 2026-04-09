const { DateTime } = require('luxon');

const dateTime = () => {
    return DateTime.now().setZone('Asia/Phnom_Penh').toFormat('yyyy-MM-dd HH:mm:ss');

};
const getParkingHours = (entryTime, exitTime) => {
    const entry = new Date(entryTime);
    const exit = new Date(exitTime);

    if (isNaN(entry.getTime()) || isNaN(exit.getTime())) {
        throw new Error('Invalid date format');
    }

    const diffInSeconds = Math.floor((exit - entry) / 1000);

    if (diffInSeconds < 0) return { hours: 0, minutes: 0, seconds: 0 };

    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    return { hours, minutes, seconds };
};
module.exports = {
    dateTime,
    getParkingHours
};