const { Schema, model } = require("mongoose");

const eventSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
        min: 10,
    },
    time: {
        type: Date,
    },
    eventImage: {
        type: String,
        required: true,
        default: './images/boiler-room.jpeg'
    },
    address: {
        type: {
            type: String
        },
        coordinates: [Number],
        direction: String
    },
    socialMedia: {
        instagramUrl: {
            type: String
        },
        spotifyUrl: {
            type: String
        },
        youtubeUrl: {
            type: String
        }
    },
    assistants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

eventSchema.index({ location: '2dsphere' })

const Event = model("Event", eventSchema);

module.exports = Event;