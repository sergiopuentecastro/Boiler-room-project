const router = require("express").Router();
const Event = require('../models/Event.model')
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')
const Rating = require('../models/Rating.model')

router.post('/new', (req, res) => {

    const { rate, event } = req.body

    Rating

        .create({ rate, author: req.session.currentUser?._id, event })
        .then(() => res.redirect(`/event/${event}`))
        .catch(error => console.log(error))
})

// router.post('/:id/new', (req, res) => {
//     const { id } = req.params
//     const { rate, event } = req.body

//     Rating

//         .findByIdAndUpdate(id, { rate, author: req.session.currentUser._id, event }, { new: true })
//         .then(() => res.redirect(`/event/${event}`))
//         .catch(error => console.log(error))
// })

module.exports = router