const router = require("express").Router()
const Event = require('../models/Event.model')
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')
const Rating = require('../models/Rating.model')
const { average, producerOrAdmin } = require('../utils/index')
const { checkId, isLoggedIn, checkRoles } = require("../middleware")
const CDNupload = require('../config/cloudinary.config')


// Vista de los eventos
router.get('/', (req, res) => {
    console.log("pidiendo eventos")
    Event
        .find()
        .select('title capacity time eventImage address')
        .then(events => {
            console.log(events)
            res.render('event/list', { events, isLogged: req.session.currentUser })
        })
        .catch((err) => console.error(err))

})


// Creación de eventos
router.get('/new', isLoggedIn, checkRoles('PR', 'AD'), (req, res) => {

    Event
        .find()
        .then((events) => res.render('event/new-event', { events, isLogged: req.session.currentUser, producerOrAdmin: producerOrAdmin(req) }))
        .catch((err) => console.error(err))
})

router.post('/new', CDNupload.single('eventImage'), checkRoles('PR', 'AD'), (req, res) => {

    const { title, description, capacity, time, instagramUrl, spotifyUrl, youtubeUrl, lat, lng, direction, assistants } = req.body
    const address = {
        type: 'Point',
        coordinates: [lat, lng],
        direction: direction
    }
    console.log('===========___________=======>', req.file)


    if (title.length === 0) {
        res.render('event/new-event', { errorMsg: 'El título es obligatorio' })
        return
    }
    if (description.length === 0) {
        res.render('event/new-event', { errorMsg: 'La descripción del evento es obligatoria' })
        return
    }
    if (capacity.length < 0) {
        res.render('event/new-event', { errorMsg: 'La capacidad es obligatoria' })
        return
    }
    // if (eventImage.length === 0) {
    //     res.render('event/new-event', { errorMsg: 'La imagen del evento es obligatoria' })
    //     return
    // }

    Event
        .create({ title, description, capacity, time, eventImage: req.file.path, address, socialMedia: { instagramUrl, spotifyUrl, youtubeUrl }, assistants })
        .then(() => res.redirect('/event'))
        .catch((err) => console.log(err))

})



// Editar evento
router.get('/:id/edit', isLoggedIn, checkRoles('PR', 'AD'), (req, res) => {
    const { id } = req.params

    Event
        .findById(id)
        .then(events => res.render('event/edit-event', { events }))
        .catch(err => console.log(err))

})

router.post('/:id/edit', CDNupload.single('eventImage'), isLoggedIn, checkRoles('PR', 'AD'), (req, res) => {

    const { id } = req.params
    const { title, description, capacity, time, eventImage, socialMedia, lat, lng } = req.body
    const address = {
        type: 'Point',
        coordinates: [lat, lng]
    }

    if (title.length === 0) {
        res.render('event/edit-event', { errorMsg: 'El título es obligatorio' })
        return
    }
    if (description.length === 0) {
        res.render('event/edit-event', { errorMsg: 'La descripción del evento es obligatoria' })
        return
    }
    if (capacity.length < 0) {
        res.render('event/edit-event', { errorMsg: 'La capacidad es obligatoria' })
        return
    }
    if (eventImage.length === 0) {
        res.render('event/edit-event', { errorMsg: 'La imagen del evento es obligatoria' })
        return
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
    let isAssitant = undefined

    Promise
        .all([event, comments, ratings])
        .then(response => {
            let avg = Math.round(average(response[2].map(elm => elm.rate)))
            response[0].assistants.includes(req.session.currentUser._id) ? isAssitant = true : isAssitant = false
            res.render('event/details-event', { response, avg, producerOrAdmin: producerOrAdmin(req), isAssitant })
        })
        .catch(err => console.log('Error', err))
})

module.exports = router