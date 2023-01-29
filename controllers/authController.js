const User = require('../models/User');

module.exports.signup_get = (req, res) => {
  res.render('signup');
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send('Something went wrong');
    console.log(err);
  }
};

module.exports.login_get = (req, res) => {
  res.render('login');
};

module.exports.login_post = (req, res) => {
  res.send('New log in');
};
