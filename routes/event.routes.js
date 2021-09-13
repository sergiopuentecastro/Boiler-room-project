const router = require("express").Router();
const Event = require('../models/Event.model');


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

    const { title, description, capacity, time, eventImage, socialMedia } = req.body

    Event
    .create( { title, description, capacity, time, eventImage, socialMedia } )
    .then(() => res.redirect ('/event'))
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
    res.send('Renderizado de vista de edición de evento')
    const { _id } = req.query

    Event
    .findById(_id)
    .then(events => res.render ('event/edit-event'))

    // Book
    //   .findById(book_id)
    //   .then(theBook => res.render('books/edit-book-form', theBook))
    //   .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {
    res.send('Gestión de edición de evento')
})


// Eliminar evento
router.post('/:id/delete', (req, res) => {
    res.send('Eliminar evento')
})


// Valoración del evento
router.get('/:id/rating', (req, res) => {
    res.send('Edicion de la valoración del evento')
})

// Detalles del evento
router.get('/:id', (req, res) => {
    res.send('Renderizado de vistas del evento (id)')
})

module.exports = router