const { dispatch } = require('@helpers/http');

module.exports = (app, resources) => {
  app.post('/user/login', async(req, res, next) => {
    const { UsersService } = resources.services;

    try {
      const user = await UsersService.authenticate(req.body);
      const token = await UsersService.generateToken(user);

      res.send(dispatch({
        data: { token },
      }));
    } catch (err) {
      next(err);
    }
  });
};
