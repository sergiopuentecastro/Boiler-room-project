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

    const { title, description, time } = req.body

    Comment
        .create({ title, description, time }, { user: req.body.user._id })
        .then((comments) => {
            Comment
                .findById()
        })
})



// .then(purchase => {
//     Purchase.findById(purchase._id)
//         .populate('album')
//         .populate('user')
//         .then(purchase => res.json({ data: purchase }))
// })
// .catch(error => console.log(error))


// Edición de comentarios
router.get('/:id/edit', (req, res) => {
    res.send('Renderizado de vista de edición comentario')
})

router.post('/:id/edit', (req, res) => {
    res.send('Gestión de edición comentario')
})


// Eliminacion de comentarios
router.post('/:id/delete', (req, res) => {
    res.send('Eliminación de comentarios')
})


module.exports = router