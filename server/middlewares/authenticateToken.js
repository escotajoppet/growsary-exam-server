const GrowsaryError = require('@server/error');
const jwt = require('jsonwebtoken');
const { status } = require('@helpers/http');

const authenticateToken = (req, _res, next) => {
  const authToken = req.header('X-Access-Token');

  if (!authToken) {
    throw new GrowsaryError(
      'authenticateToken::authenticateToken',
      'Please provide your authentication token',
      status.UNAUTHORIZED,
    );
  }

  jwt.verify(authToken, process.env.SECRET_TOKEN, (err, user) => {
    if (err) {
      throw new GrowsaryError(
        'authenticateToken::jwt.verify',
        'Forbidden: Invalid token',
        status.FORBIDDEN,
      );
    }

    req.user = user;

    next();
  });
};

module.exports = authenticateToken;
