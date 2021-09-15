const router = require("express").Router()
const Event = require('../models/Event.model')
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')
const Rating = require('../models/Rating.model')
const { average } = require('../utils/index')
const { checkId, isLoggedIn, checkRoles } = require("../middleware")


// Vista de los eventos
router.get('/', (req, res) => {

    Event
        .find()
        .select('title capacity time eventImage')
        .then(events => {
            res.render('event/list', { events, isLogged: req.session.currentUser })
        })
        .catch((err) => console.error(err))

})


// Creación de eventos
router.get('/new', isLoggedIn, checkRoles('PR'), (req, res) => {

    Event
        .find()
        .then((events) => res.render('event/new-event', { events, isLogged: req.session.currentUser, isPR: req.session.currentUser?.role === 'PR' }))
        .catch((err) => console.error(err))
})

router.post('/new', checkRoles('PR'), (req, res) => {

    const { title, description, capacity, time, eventImage, instagramUrl, spotifyUrl, youtubeUrl, lat, lng, assistants } = req.body

    const address = {
        type: 'Point',
        coordinates: [lat, lng]
    }


    Event
        .create({ title, description, capacity, time, eventImage, address, socialMedia: { instagramUrl, spotifyUrl, youtubeUrl }, assistants })
        .then(() => res.redirect('/event'))
        .catch((err) => console.log(err))

})


// Editar eventot
router.get('/:id/edit', isLoggedIn, checkRoles('PR'), (req, res) => {
    const { id } = req.params

    Event
        .findById(id)
        .then(events => res.render('event/edit-event', { events }))
        .catch(err => console.log(err))

})

router.post('/:id/edit', isLoggedIn, checkRoles('PR'), (req, res) => {

    const { id } = req.params
    const { title, description, capacity, time, eventImage, socialMedia, lat, lng } = req.body

    const address = {
        type: 'Point',
        coordinates: [lat, lng]
    }

    Event
        .findByIdAndUpdate(id, { title, description, capacity, time, eventImage, socialMedia, address }, { new: true })
        .then(events => res.redirect(`/event/${events.id}`))
        .catch(err => console.log('Error', err))

})


// Eliminar evento
router.post('/:id/delete', isLoggedIn, checkRoles('PR', 'AD'), (req, res) => {
    const { id } = req.params

    Event
        .findByIdAndRemove(id)
        .then(() => res.redirect('/event'))
        .catch(err => console.log('Error', err))

})


//Detalles del evento
router.get('/:id', isLoggedIn, checkRoles('US', 'PR', 'AD'), (req, res) => {

    const { id } = req.params
    const event = Event.findById(id)
    const comments = Comment.find({ event: id })
    const ratings = Rating.find({ event: id })

    Promise
        .all([event, comments, ratings])
        .then(response => {
            let avg = Math.round(average(response[2].map(elm => elm.rate)))
            res.render('event/details-event', { response, avg, })
        })
        .catch(err => console.log('Error', err))
})

module.exports = router