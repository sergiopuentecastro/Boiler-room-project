const router = require("express").Router()


// Creación de comentarios
router.get('/new', (req, res) => {
    res.send('Renderizado de vista de nuevo comentario')
})

router.post('/new', (req, res) => {
    res.send('Gestión de nuevo comentario')
})


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