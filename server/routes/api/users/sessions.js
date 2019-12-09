const { dispatch } = require('@helpers/http');
const { validateRequest } = require('@server/middlewares');
const { body } = require('express-validator');

module.exports = (app, resources) => {
  const { UsersService } = resources.services;

  app.post('/user/login', [
    body('email', 'Invalid email provided')
      .isEmail(),
    body('password', 'No password provided')
      .not()
      .isEmpty(),
  ], validateRequest, async(req, res, next) => {
    try {
      const user = await UsersService.authenticate(req.body);
      const token = await UsersService.generateToken(user);

      res.send(dispatch({
        data: {
          token,
          user,
        },
      }));
    } catch (err) {
      next(err);
    }
  });
};
