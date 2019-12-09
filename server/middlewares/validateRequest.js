const { validationResult } = require('express-validator');
const GrowsaryError = require('@server/error');
const { status } = require('@helpers/http');

const validateRequest = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(
      new GrowsaryError(
        `validateRe quest::${req.method}:${req.url}`,
        errors.array().map(error => error.msg).join('<br />'),
        status.UNPROCESSABLE_ENTITY,
      ),
    );
  }

  next();
};

module.exports = validateRequest;
