const { Schema, model } = require("mongoose");

const ratingSchema = new Schema({
    rate: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
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