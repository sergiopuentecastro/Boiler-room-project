const mongoose = require("mongoose")

module.exports = {
    average: (array) => {

        if (!array || array.length === 0) return 0
        let sum = array.reduce((previous, current) => current + previous, 0)
        let avg = sum / array.length
        return avg
    },

    producerOrAdmin: (req) => {

        let isPr = req.session.currentUser?.role === 'PR'
        let isAd = req.session.currentUser?.role === 'AD'
        if (isPr || isAd) {
            return true
        }
    },

    adminRole: (req) => {
        let isAdmin = req.session.currentUser?.role === 'AD'
        if (isAdmin) {
            return true
        }
    },

    userAssistant: (req) => {

        if (req.session.currentUser && response[0]._id) {
            return true
        }
    }
}