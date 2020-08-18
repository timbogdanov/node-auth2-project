const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../users/users-model');
const constants = require('../../utils/constants');

router.post('/register', (req, res) => {
  const { username, password, department } = req.body;

  const hash = bcrypt.hashSync(password);

  User.add({ username, password: hash, department })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: 'unable to register user' });
    });
});

router.post('/login', (req, res) => {
  const { username, password, department } = req.body;

  User.findBy({ username: username }).then(([user]) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = signToken(user);
      res
        .status(200)
        .json({ message: `velcome ${user.username}`, token });
    } else {
      res
        .status(401)
        .json({ message: 'invalid username or password' });
    }
  });
});

function signToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  };

  const options = {
    expiresIn: '10d',
  };

  return jwt.sign(payload, constants.jwtSecret, options);
}

module.exports = router;
