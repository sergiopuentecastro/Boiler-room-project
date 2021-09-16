const router = require("express").Router();
const User = require("../models/User.model")
const { checkId, isLoggedIn, checkRoles } = require("../middleware")




// Ver todos los Usuarios

router.get('/users-list', isLoggedIn, checkRoles('AD'), (req, res) => {

    User
        .find()
        .then(users => res.render('admin/user-list', { users }))
        .catch(error => console.log(error))
})


// Eliminar usuarios
router.post('/:id/user-delete', isLoggedIn, checkRoles('AD'), (req, res) => {

    const { id } = req.params

    User
        .findByIdAndRemove(id)
        .then(() => res.redirect('/admin/users-list'))
        .catch(error => console.log(error))

})

// Cambiar roles de usuarios
router.post('/:id/chage-role', isLoggedIn, checkRoles('AD'), (req, res) => {
    const { id } = req.params
    const { role } = req.body

    User
        .findByIdAndUpdate(id, { role }, { new: true })
        .then(() => res.redirect('/admin/users-list'))
        .catch(error => console.log(error))
})

module.exports = router;