const jwt = require('jsonwebtoken');

const constants = require('../../utils/constants');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, constants.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: 'invalid token' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'please provide creds' });
  }
};
