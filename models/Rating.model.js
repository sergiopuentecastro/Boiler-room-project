const { Schema, model } = require("mongoose");

const ratingSchema = new Schema({

    type: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }
}, {
    timestamps: true
})

const Rating = model("Rating", ratingSchema);

module.exports = Rating;