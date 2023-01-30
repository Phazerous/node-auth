const User = require('../models/User');

const handleErrors = (err) => {
  const errors = { email: '', password: '' };

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (err.code === 11000) {
    errors.email = 'The email is already taken';
  }

  return errors;
};

module.exports.signup_get = (req, res) => {
  res.render('signup');
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(200).send(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.login_get = (req, res) => {
  res.render('login');
};

module.exports.login_post = (req, res) => {
  res.send('New log in');
};
