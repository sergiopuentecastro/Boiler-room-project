const router = require("express").Router()
const Event = require('../models/Event.model')
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')


// Vista de los eventos
router.get('/', (req, res) => {

    Event
        .find()
        .then((events) => {
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

    const { title, description, capacity, time, eventImage, socialMedia, lat, lng } = req.body

    const address = {
        type: 'Point',
        coordinates: [lat, lng]
    }


    Event
        .create({ title, description, capacity, time, eventImage, socialMedia, address })
        .then(() => res.redirect('/event'))
        .catch((err) => console.log(err))

})



// Asistencia del evento
router.post('/:id/assistant', (req, res) => {
    res.send('Modificación de asistencia del evento')
})

router.post('/:id/assistantremoved', (req, res) => {
    res.send('Eliminación de asistencia del evento')
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
    const { title, description, capacity, time, eventImage, socialMedia, address } = req.body

    Event
        .findByIdAndUpdate(id, { title, description, capacity, time, eventImage, socialMedia, address }, { new: true })
        .then(events => res.redirect(`/event/${events.id}`))
        .catch(err => console.log('Error', err))

})


// Eliminar evento
router.post('/:id/delete', (req, res) => {
    const { id } = req.params

    Event
        .findByIdAndDelete(id)
        .then(() => res.redirect('/event'))
        .catch(err => console.log('Error', err))

})


// Valoración del evento
router.get('/:id/rating', (req, res) => {
    res.send('Edicion de la valoración del evento')
})



// Detalles del evento
router.get('/:id', (req, res) => {

    const { id } = req.params
    let event = {}

    !id && res.send('No tengo ID')

    Event
        .findById(id)
        .then(events => {
            event = events;
            return Comment.find({ event: id })
        })
        .then(comment => res.render('event/details-event', { event, comment }))
        .catch(err => console.log('Error', err))
})



module.exports = router