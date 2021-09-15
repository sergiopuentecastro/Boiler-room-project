const router = require("express").Router();
const bcrypt = require('bcrypt')
const User = require("../models/User.model")
const { isLoggedIn } = require('./../middleware')


// Ver mi perfil
router.get('/profileview', isLoggedIn, (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .select('userName description profileImage')
        .then(() => res.render('user/profile', { user: req.session.currentUser }))
        .catch(err => console.log(err))
})


// Editar mi perfil
router.get('/:id/edit', isLoggedIn, (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .then(() => res.render('user/edit-profile', { user: req.session.currentUser }))
        .catch(err => console.log(err))
})

router.post('/:id/edit', isLoggedIn, (req, res) => {
    const { id } = req.params
    const { userName, age, description, profileImage, email } = req.body

    User
        .findByIdAndUpdate(id, { userName, age, description, profileImage, email }, { new: true })
        .then(user => {
            req.session.currentUser = user
            res.redirect('/myprofile/profileview')
        })
        .catch(err => console.log(err))
})


// Borrar perfil
router.post('/:id/delete', isLoggedIn, (req, res) => {
    const { id } = req.params
    User
        .findByIdAndRemove(id)
        .then(() => req.session.destroy(() => res.redirect('/')))
        .catch(err => console.log(err))

})

router.get('/:id/close', isLoggedIn, (req, res) => {
    const { id } = req.params
    User
        .findById(id)
        .then(() => req.session.destroy(() => res.redirect('/')))
        .catch(err => console.log(err))
})


module.exports = router;