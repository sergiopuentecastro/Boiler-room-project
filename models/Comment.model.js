const { Schema, model } = require("mongoose");

const commentSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    time: {
        type: Date,
        // Se pone fecha y hora?
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }
},{
    timestamps: true
})

const Comment = model("Comment", commentSchema);

module.exports = Comment;