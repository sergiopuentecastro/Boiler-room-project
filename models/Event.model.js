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
        // Se pone fecha y hora?
    },
    eventImage: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String
        },
        coordinates: [Number],
    },
    socialMedia: {
        // Como podemos poner cada red social en donde corresponda?
    },
    assistants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    rating: {
        type: Number,
        // Como limitamos el rating? Como sumamos los rating de cada usuario?
    }
},{
    timestamps: true
})

eventSchema.index({ location: '2dsphere' })

const Event = model("Event", eventSchema);

module.exports = Event;