const mongoose = require("mongoose")

module.exports = {
    average: (array) => {

        let rate = array
        let sum = rate.reduce((previous, current) => current += previous)
        let avg = sum / rate.length

        return avg
    }
}
