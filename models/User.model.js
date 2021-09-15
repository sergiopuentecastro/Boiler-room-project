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
    min: 18,
    max: 120,
  },
  description: {
    type: String,
    maxlength: 280,
  },
  profileImage: {
    type: String,
    required: true,
    default: './images/daniel-schludi-mbGxz7pt0jM-unsplash.jpeg',
  },
  role: {
    type: String,
    required: true,
    enum: ['US', 'PR', 'AD'],
    default: 'US',
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Email address is required'],
    match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,63})$/,
  },
  password: {
    type: String,
  }
}, {
  timestamps: true
})

const User = model("User", userSchema);

module.exports = User;
