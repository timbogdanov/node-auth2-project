const router = require('express').Router();

const User = require('./auth-model');

router.post('/register', (req, res) => {
  User.add(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: 'unable to register user' });
    });
});

module.exports = router;
