const router = require("express").Router();


// Registro de usuario
router.get('/signup', (req, res) => {
    res.send('Renderizado de página de registro')
})

router.post('/signup', (req, res) => {
    res.send('Gestión de resgistro de usuario')
})


// Inicio de sesión del usuario
router.get('/login', (req, res) => {
    res.send('Renderizado de página de incio de sesión')
})

router.post('/login', (req, res) => {
    res.send('Gestión de incio de sesión')
})


// Cerrar sesión
router.get('/logout', (req, res) => {
    res.send('Cerrar sesión')
})


// Ver mi perfil
router.get('/myprofile/:id', (req, res) => {
    res.send('Ver los detalles de mi perfil')
})


// Editar mi perfil
router.get('/myprofile/:id/edit', (req, res) => {
    res.send('Edito mi propio perfil')
})

router.post('/myprofile/:id/edit', (req, res) => {
    res.send('Gestion de la edición de mi perfil')
})


// Borrar perfil
router.post('/myprofile/:id/delete', (req, res) => {
    res.send('Gestión de eliminación de mi perfil')
})


module.exports = router;