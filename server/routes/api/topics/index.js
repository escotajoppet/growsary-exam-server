const {
  status,
  dispatch,
} = require('@helpers/http');
const {
  authenticateToken,
  isUserActive,
  validateRequest,
} = require('@server/middlewares');
const { body } = require('express-validator');

module.exports = (app, resources) => {
  const {
    TopicsService,
    MessagesService,
  } = resources.services;
  const { User } = resources.growsary.models;

  app.get('/topics', authenticateToken, isUserActive(User), async(req, res, next) => {
    try {
      const data = await TopicsService.getAll(req.query);

      res.send(dispatch(data));
    } catch (err) {
      next(err);
    }
  });

  app.get('/topic/:id', authenticateToken, isUserActive(User), async(req, res, next) => {
    try {
      const data = await TopicsService.getOne(req.params.id);

      res.send(dispatch({ data }));
    } catch (err) {
      next(err);
    }
  });

  app.post('/topic', authenticateToken, isUserActive(User), [
    body('subject', 'Subject is required')
      .not()
      .isEmpty(),
    body('description', 'Description is required')
      .not()
      .isEmpty(),
  ], validateRequest, async(req, res, next) => {
    try {
      const data = await TopicsService.create(
        req.user.id,
        req.body,
      );

      res.status(status.CREATED).send(
        dispatch({
          data,
          status: status.CREATED,
        }),
      );
    } catch (err) {
      next(err);
    }
  });

  app.patch('/topic/:id', authenticateToken, isUserActive(User), async(req, res, next) => {
    try {
      const data = await TopicsService.update(
        req.user.id,
        req.params.id,
        req.body,
      );

      res.send(dispatch({ data }));
    } catch (err) {
      next(err);
    }
  });

  app.delete('/topic/:id', authenticateToken, isUserActive(User), async(req, res, next) => {
    try {
      await TopicsService.delete(
        req.user.id,
        req.params.id,
      );

      res.send(dispatch());
    } catch (err) {
      next(err);
    }
  });

  app.get('/topic/:id/messages', authenticateToken, isUserActive(User), async(req, res, next) => {
    try {
      const data = await MessagesService.getAll(
        req.params.id,
        req.query,
      );

      res.send(dispatch(data));
    } catch (err) {
      next(err);
    }
  });

  app.post('/topic/:id/message', authenticateToken, isUserActive(User), async(req, res, next) => {
    try {
      const data = await MessagesService.create(
        req.user.id,
        req.params.id,
        req.body,
      );

      res.status(status.CREATED).send(
        dispatch({
          data,
          status: status.CREATED,
        }),
      );
    } catch (err) {
      next(err);
    }
  });
};
