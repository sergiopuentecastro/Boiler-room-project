const router = require("express").Router()
const Event = require('../models/Event.model')
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')


router.post('/new', (req, res) => {

    const { title, description, event } = req.body

    Comment
        .create({ title, description, author: req.session.currentUser.id, event })
        .then(() => res.redirect(`/event/${event}`))
        .catch(error => console.log(error))
})


router.post('/:id/edit', (req, res) => {

    const { id } = req.params
    const { title, description, event } = req.body

    Comment
        .findByIdAndUpdate(id, { title, description, author: req.session.currentUser.id, event }, { new: true })
        .then(() => res.redirect(`/event/${event}`))
        .catch(err => console.log(err))
})


// Eliminacion de comentarios
router.post('/:id/delete', (req, res) => {

    const { id } = req.params

    Comment
        .findByIdAndRemove(id)
        .then(event => {
            console.log(event);
            res.redirect(`/event/${event.event}`)
        })
        .catch(err => console.log('Error', err))
})


module.exports = router