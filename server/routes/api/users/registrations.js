const {
  status,
  dispatch,
} = require('@helpers/http');

module.exports = (app, resources) => {
  app.post('/user/register', async(req, res, next) => {
    const { UsersService } = resources.services;

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
