const router = require("express").Router();
const Rating = require('../models/Rating.model')

router.post('/new', (req, res) => {

    const { rate, event } = req.body

    Rating

        .create({ rate, author: req.session.currentUser?._id, event })
        .then(() => res.redirect(`/event/${event}`))
        .catch(error => console.log(error))
})

module.exports = router