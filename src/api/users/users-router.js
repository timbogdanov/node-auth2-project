const router = require('express').Router();

const Users = require('./users-model');
const protected = require('../auth/protected');

router.get('/', protected, (req, res) => {
  Users.getAll().then((users) => {
    res.status(200).json(users);
  });
});

module.exports = router;
