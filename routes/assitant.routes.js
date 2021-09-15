const router = require("express").Router()
const Event = require('../models/Event.model')
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')


router.post('/assistant', (req, res) => {
    const { event } = req.body

    Event.findOne({ _id: event, assistants: req.session.currentUser._id })
        .then(e => {
            if (e) {
                document.querySelector("#buton-assistant").classList.add('btn-danger')
                return
            }

            return Event
                .findByIdAndUpdate(event, { $push: { assistants: req.session.currentUser._id } })
        })
        .then(() => res.redirect(`/event/${event}`))
        .catch(error => console.log(error))
})

// router.post('/:id/assistantremoved', (req, res) => {
//     res.send('Eliminación de asistencia del evento')
// })

module.exports = router