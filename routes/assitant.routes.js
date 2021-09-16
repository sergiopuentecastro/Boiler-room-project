const router = require("express").Router()
const Event = require('../models/Event.model')
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')


router.post('/assistant', (req, res) => {
    const { event } = req.body

    Event
        .findOne({ _id: event, assistants: req.session.currentUser._id })
        .then(elm => {
            if (elm) {
                return
            }
            return Event.findByIdAndUpdate(event, { $push: { assistants: req.session.currentUser._id } })
        })
        .then(() => res.redirect(`/event/${event}`))
        .catch(error => console.log(error))
})

router.post('/assistantremoved', (req, res) => {

    const { event } = req.body

    Event
        .findOne({ _id: event, assistants: req.session.currentUser._id })
        .then(() => {
            return Event
                .findByIdAndUpdate(event, { $pull: { assistants: req.session.currentUser._id } })
        })
        .then(() => res.redirect(`/event/${event}`))
        .catch(err => console.log('Error', err))
})


module.exports = router