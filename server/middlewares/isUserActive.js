const GrowsaryError = require('@server/error');
const { status } = require('@helpers/http');
const isUserActive = (User) => {
  return async(req, _res, next) => {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    console.log({asd: user.isActive})

    if (!user.isActive) {
      next(
        new GrowsaryError(
          'isUserActive',
          'User is inactive',
          status.FORBIDDEN,
        ),
      );
    }

    next();
  };
};

module.exports = isUserActive;
