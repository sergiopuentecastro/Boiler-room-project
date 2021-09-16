const router = require("express").Router();
const bcrypt = require('bcrypt')
const User = require("../models/User.model")
const { isLoggedIn } = require('./../middleware')
const CDNupload = require('../config/cloudinary.config')


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
        .then(user => res.render('user/edit-profile', { user: req.session.currentUser }))
        .catch(err => console.log(err))
})

router.post('/:id/edit', CDNupload.single('profileImage'), isLoggedIn, (req, res) => {
    const { id } = req.params
    const { userName, age, description, email } = req.body

    User
        .findByIdAndUpdate(id, { userName, age, description, profileImage, email }, { new: true })
        .then(user => {
            if (age < 18) {
                res.render('user/edit-profile', { errorMsg: 'Para mayores de 18 años' })
                return
            }
            if (userName.length === 0) {
                res.render('user/edit-profile', { errorMsg: 'Nombre obligatorio' })
                return
            }
            if (email.length === 0) {
                res.render('user/edit-profile', { errorMsg: 'Mail obligatorio' })
                return
            }
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


module.exports = router;