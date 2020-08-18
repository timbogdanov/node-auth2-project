const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('./auth-model');

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

router.post('/login', (req, res) => {});

module.exports = router;
