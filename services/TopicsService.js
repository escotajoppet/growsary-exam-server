const GrowsaryError = require('@server/error');
const { status } = require('@helpers/http');
const { fn } = require('sequelize');
const { paginate } = require('@helpers');

class TopicsService {
  constructor(resources) {
    const { models } = resources.growsary;

    this.Topic = models.Topic;
  }

  async getAll(query) {
    const page = query.page ? parseInt(query.page, 10) : 1;
    const pageSize = query.pageSize ? parseInt(query.pageSize, 10) : 10;
    const totalItems = await this.Topic.count();
    const pageCount = Math.ceil(totalItems / pageSize);

    const data = await this.Topic.findAll(
      paginate({
        order: [
          ['createdAt', 'DESC'],
        ],
      }, {
        page,
        pageSize,
      }),
    );

    return {
      data,
      page,
      pageSize,
      pageCount,
    };
  }

  getOne(id) {
    return this.Topic.findOne({
      where: { id },
      rejectOnEmpty: new GrowsaryError(
        'TopicsService::getOne',
        `No topics found: ${id}`,
        status.NOT_FOUND,
      ),
    });
  }

  create(userId, data) {
    return this.Topic.create({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  async update(userId, id, data) {
    const topic = await this.getOne(id);

    return topic.update({
      ...data,
      updateBy: userId,
    });
  }

  async delete(userId, id) {
    const topic = await this.getOne(id);

    return topic.update({
      deletedAt: fn('CURRENT_TIMESTAMP'),
      deletedBy: userId,
    });
  }
}

module.exports = TopicsService;
