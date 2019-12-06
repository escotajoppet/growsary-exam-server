const GrowsaryError = require('@server/error');
const { status } = require('@helpers/http');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsersService {
  constructor(resources) {
    const { models } = resources.growsary;

    this.User = models.User;
  }

  async authenticate({ email, password }) {
    const user = this.User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new GrowsaryError(
        'UsersService::login',
        'No users found',
        status.NOT_FOUND,
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new GrowsaryError(
        'UsersService::login',
        'Password is incorrect',
        status.UNAUTHORIZED,
      );
    }

    return user;
  }

  async generateToken(user) {
    return jwt.sign(user, process.env.SECRET_TOKEN);
  }

  async create(data) {
    const {
      email,
      name,
      password,
    } = data;

    return this.User
      .create({
        email,
        name,
        password,
      })
      .then((user) => {
        return this.User.findOne({
          where: {
            id: user.id,
          },
        });
      })
      .catch((err) => {
        switch (err.name) {
          case 'SequelizeUniqueConstraintError':
            throw new GrowsaryError(
              'UsersService::create',
              `${err.name}::${err.parent.sqlMessage}`,
              status.CONFLICT,
              err.fields,
            );
          default:
            throw new GrowsaryError(
              'UsersService::create',
              err.message,
            );
        }
      });
  }
}

module.exports = UsersService;
