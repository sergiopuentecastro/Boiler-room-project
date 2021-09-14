const router = require("express").Router()
const Event = require('../models/Event.model')
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')


// Creación de comentarios
router.get('/new', (req, res) => {

    Comment
        .find()
        .then((comments) => {
            res.render('comment/new-comment', { comments })
        })
        .catch((err) => console.error(err))
})

router.post('/new', (req, res) => {

    const { title, description } = req.body

    Comment
        .create({ title, description, time }, { user: req.body.user._id })
        .then((comments) => {
            Comment
                .findById(comments.id)
                .populate('user')
                .then(comments => res.render('/event/:id', { comments }))
        })
        .catch(error => console.log(error))
})



// Edición de comentarios
router.get('/:id/edit', (req, res) => {


    const { id } = req.params

    Comment
        .findById(id)
        .then(events => res.render(`/event/${events.id}`, { events }))
        .catch(err => console.log(err))

})

router.post('/:id/edit', (req, res) => {

    const { id } = req.params
    const { title, description } = req.body

    Comment
        .findByIdAndUpdate(id, { title, description }, { new: true })
        .then(events => res.redirect(`/event/${events.id}`))
        .catch(err => console.log('Error', err))
})


// Eliminacion de comentarios
router.post('/:id/delete', (req, res) => {

    Comment
        .findByIdAndDelete(req.params.id)
        .then(() => res.redirect(`/event/${events.id}`))
        .catch(err => console.log('Error', err))
})


module.exports = router