const router = require("express").Router();
const bcrypt = require('bcrypt')
const User = require("../models/User.model")


// Registro de usuario
router.get('/signup', (req, res) => {
    res.render('auth/signup')
})

router.post('/signup', (req, res) => {
    const { userName, email, userPwd, profileImage, age, description } = req.body
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

            User
                .create({ userName, email, password: hashPass, profileImage, age, description })
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
            res.redirect('/')
        })
        .catch(err => console.log(err))
})


// Cerrar sesión
router.get('/logout', (req, res) => {

    req.session.destroy(() => res.redirect('/'))
})

module.exports = router;