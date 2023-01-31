const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minLength: [6, `The password's length should be at least 8 characters.`],
  },
});

userSchema.statics.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error('Incorrect email address');

  if (user.password !== password) throw new Error('Wrong password');

  return user;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
