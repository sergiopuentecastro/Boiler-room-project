const router = require("express").Router()

const Event = require('./../models/Event.model')

router.get('/event', (req, res) => {

    Event
        .find()
        .then(events => res.json(events))
        .catch(err => console.log(err))

})

module.exports = router