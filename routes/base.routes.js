const router = require("express").Router()

router.get("/", (req, res, next) => res.render("index"))

router.get('/contact', (req, res) => res.send('Nuestro contacto'))

router.get('/about', (req, res) => res.render('base/about'))

module.exports = router
