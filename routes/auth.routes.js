const router = require("express").Router();
const bcrypt = require('bcrypt')
const User = require("../models/User.model")
const CDNupload = require('../config/cloudinary.config')


// Registro de usuario
router.get('/signup', (req, res) => {
    res.render('auth/signup')
})

router.post('/signup', CDNupload.single('profileImage'), (req, res) => {
    const { userName, email, userPwd, age, description } = req.body
    if (userPwd.length === 0) {
        res.render('auth/signup', { errorMsg: 'La contraseña es obligatoria' })
        return
    }
    if (userName.length === 0) {
        res.render('auth/signup', { errorMsg: 'El nombre de usuario es obligatorio' })
        return
    }
    if (email.length === 0) {
        res.render('auth/signup', { errorMsg: 'El email es obligatorio' })
        return
    }
    if (age < 18) {
        res.render('auth/signup', { errorMsg: 'Para mayores de 18 años' })
        return
    }
    User
        .findOne({ email })
        .then(user => {
            if (user) {
                res.render('auth/signup', { errorMsg: 'Usuario ya registrado' })
                return
            }
            const bcryptSalt = 10
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(userPwd, salt)

            const query = { userName, email, password: hashPass, age }
            if (profileImage) query.profileImage = profileImage
            User
                .create(query)
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})


// Inicio de sesión del usuario
router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', (req, res) => {
    const { userName, userPwd } = req.body

    if (userPwd.length === 0) {
        res.render('auth/login', { errorMsg: 'Falta la contraseña' })
        return
    }
    if (userName.length === 0) {
        res.render('auth/login', { errorMsg: 'Rellena el nombre de usuario' })
        return
    }

    User
        .findOne({ userName })
        .then(user => {

            if (!user) {
                res.render('auth/login', { errorMsg: 'Usuario no reconocido' })
                return
            }

            if (bcrypt.compareSync(userPwd, user.password) === false) {
                res.render('auth/login', { errorMsg: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = user
            req.app.locals.isLogged = req.session.currentUser
            if (user.role === 'PR') {
                req.app.locals.producerOrAd = true
            } else if (user.role === 'AD') {
                req.app.locals.isAdmin = true
                req.app.locals.producerOrAd = true
            }
            res.redirect('/')
        })
        .catch(err => console.log(err))
})


// Cerrar sesión
router.get('/logout', (req, res) => {
    req.app.locals.isLogged = false
    req.app.locals.producerOrAd = false
    req.app.locals.isAdmin = false
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router;