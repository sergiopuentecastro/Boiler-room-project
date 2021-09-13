const router = require("express").Router();


// Vista de los eventos
router.get('/', (req, res) => {
    res.send('Vista de los eventos')
})


// Creación de eventos
router.get('/new', (req, res) => {
res.send('Renderizado de vistas de nuevo evento')
})

router.post('/new', (req, res) => {
    res.send('Gestion de creación de nuevo evento')
})


// Detalles del evento
router.get('/:id', (req, res) => {
    res.send('Renderizado de vistas del evento')
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


module.exports = router