const calculateFee = (hours, prices, dis) => {


    let totalFee = 0;
    let remainingHours = parseFloat(hours); // force number;

    for (const tier of prices) {
        if (remainingHours <= 0) break;

        const tierSize = tier.to_hour === null
            ? remainingHours                              // 7+ takes all remaining
            : tier.to_hour - tier.from_hour + 1;         // fixed tier size

        const hoursInTier = Math.min(remainingHours, tierSize); // actual hours used in this tier

        totalFee += hoursInTier * parseFloat(tier.price_per_hour);
        remainingHours -= hoursInTier;
    }
    if (dis == 0) {

        return { totalFee: parseFloat(totalFee.toFixed(2)) }
    }
    let discount = totalFee * (dis / 100);
    let finalFee = totalFee - discount;
    return {
        totalFee: parseFloat(totalFee.toFixed(2)),
        discount: parseFloat(discount.toFixed(2)),
        finalFee: parseFloat(finalFee.toFixed(2))
    };
};
module.exports = {
    calculateFee
}