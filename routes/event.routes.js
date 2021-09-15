const router = require("express").Router()
const Event = require('../models/Event.model')
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')
const Rating = require('../models/Rating.model')
const { average } = require('../utils/index')


// Vista de los eventos
router.get('/', (req, res) => {

    Event
        .find()
        // .select('title capacity time eventImage')
        .then(events => {
            res.render('event/list', { events })
        })
        .catch((err) => console.error(err))

})


// Creación de eventos
router.get('/new', (req, res) => {

    Event
        .find()
        .then((events) => {
            res.render('event/new-event', { events })
        })
        .catch((err) => console.error(err))
})

router.post('/new', (req, res) => {

    const { title, description, capacity, time, eventImage, socialMedia, lat, lng, assistants } = req.body

    const address = {
        type: 'Point',
        coordinates: [lat, lng]
    }


    Event
        .create({ title, description, capacity, time, eventImage, socialMedia, address, assistants })
        .then(() => res.redirect('/event'))
        .catch((err) => console.log(err))

})

// Editar evento
router.get('/:id/edit', (req, res) => {
    const { id } = req.params

    Event
        .findById(id)
        .then(events => res.render('event/edit-event', { events }))
        .catch(err => console.log(err))

})

router.post('/:id/edit', (req, res) => {

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
router.post('/:id/delete', (req, res) => {
    const { id } = req.params

    Event
        .findByIdAndRemove(id)
        .then(() => res.redirect('/event'))
        .catch(err => console.log('Error', err))

})

//Detalles del evento
router.get('/:id', (req, res) => {

    const { id } = req.params
    const event = Event.findById(id)
    const comments = Comment.find({ event: id })
    const ratings = Rating.find({ event: id })

    Promise
        .all([event, comments, ratings])
        .then(response => {

            let avg = Math.round(average(response[2].map(elm => elm.rate)))
            res.render('event/details-event', { response, avg })

        })
        .catch(err => console.log('Error', err))
})

module.exports = router