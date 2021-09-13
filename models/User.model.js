const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: {
    unique: true,
    type: String,
    required: true,
    default: 'Unknown name',
    minlength: 3,
    maxlength: 100,
    trim: true,
    set: value => value.charAt(0).toUpperCase() + value.substring(1).toLowerCase()
  },
  age: {
    type: Number,
    min: 1,
    max: 10,
  },
  description: {
    type: String,
    maxlength: 280,
    // Si no ponen nada sale null?
  },
  profileImage: {
    type: String,
    required: true,
    default: '', // Meter imagen obligatoria
  },
  role: {
    type: String,
    enum: ['US', 'PR', 'AD'],
    default: 'US',
  },
  email: {
    type: String,
    // trim: true,
    unique: true,
    required: [true, 'Email address is required'],
    match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,63})$/,
  },
  password: {
    type: String,
    minlength: 5,
  }
}, {
  timestamps: true
})

const User = model("User", userSchema);

module.exports = User;
