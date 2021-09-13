const router = require("express").Router();
const User = require("../models/User.model")


// Ver mi perfil
router.get('/:id', (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .then(userProfile => res.render('user/profile', { userProfile }))
        .catch(err => console.log(err))
})


// Editar mi perfil
router.get('/:id/edit', (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .then(userProfile => res.render('user/edit-profile', { userProfile }))
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    const { userName, age, description, profileImage, email } = req.body

    User
        .findByIdAndUpdate(id, { userName, age, description, profileImage, email }, { new: true })
        .then(userId => res.redirect('/:id', userId))
        .catch(err => console.log(err))
})


// Borrar perfil
router.post('/:id/delete', (req, res) => {
    res.send('Gestión de eliminación de mi perfil')
})


module.exports = router;