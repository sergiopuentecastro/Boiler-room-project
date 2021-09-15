const router = require("express").Router()
const Event = require('../models/Event.model')
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')


router.post('/assistant', (req, res) => {
    const { event } = req.body

    Event
        .findByIdAndUpdate(event,)
    console.log('=======================>', event)
        .then(() => res.redirect(`/event/${event}`))
        .catch(error => console.log(error))
})

// router.post('/:id/assistantremoved', (req, res) => {
//     res.send('Eliminación de asistencia del evento')
// })

module.exports = router