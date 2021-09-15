const mongoose = require("mongoose")

module.exports = {
    average: (array) => {

        if (!array || array.length === 0) return 0

        let sum = array.reduce((previous, current) => current + previous, 0)
        let avg = sum / array.length

        return avg
    }
}
