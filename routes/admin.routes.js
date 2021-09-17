const router = require("express").Router();
const User = require("../models/User.model")
const { checkId, isLoggedIn, checkRoles } = require("../middleware")


// Buscar usuarios(renderizado)
router.get('/users-search', isLoggedIn, checkRoles('AD'), (req, res) => res.render('admin/user-list'))


// Buscar usuarios (gestión)
router.post('/users-search', isLoggedIn, checkRoles('AD'), (req, res) => {

    const { userName } = req.body

    User
        .findOne({ userName })
        .then(user => {
            console.log(user)
            res.render('admin/user-list', { user })
        })
        .catch(error => console.log(error))
})

//Perfil de Usuario
router.get('/user-profile/:id', isLoggedIn, checkRoles('AD'), (req, res) => {
    const { id } = req.params
    User
        .findById(id)
        .then(user => res.render('admin/user-profile', { user }))
        .catch(error => console.log(error))
})


// Eliminar usuarios
router.post('/:id/user-delete', isLoggedIn, checkRoles('AD'), (req, res) => {

    const { id } = req.params

    User
        .findByIdAndRemove(id)
        .then(() => res.redirect('/admin/users-search'))
        .catch(error => console.log(error))

})


// Cambiar roles de usuarios
router.post('/:id/change-role', isLoggedIn, checkRoles('AD'), (req, res) => {
    const { id } = req.params
    const { role } = req.body

    User
        .findByIdAndUpdate(id, { role }, { new: true })
        .then(() => res.redirect(`/admin/user-profile/${id}`))
        .catch(error => console.log(error))
})

module.exports = router;