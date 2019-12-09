const {
  status,
  dispatch,
} = require('@helpers/http');
const { validateRequest } = require('@server/middlewares');
const { body } = require('express-validator');
module.exports = (app, resources) => {
  const { UsersService } = resources.services;
  app.post('/user/register', [
    body('email', 'Invalid email provided')
      .isEmail(),
    body('name', 'No name provided')
      .not()
      .isEmpty(),
    body('password', 'No password provided')
      .not()
      .isEmpty(),
  ], validateRequest, async(req, res, next) => {
    try {
      const data = await UsersService.create(req.body);

      res.status(status.CREATED).send(dispatch({
        status: status.CREATED,
        data,
      }));
    } catch (err) {
      next(err);
    }
  });
};
