const { paginate } = require('@helpers');

class MessagesService {
  constructor(resources) {
    const { models } = resources.growsary;

    this.Message = models.Message;
  }

  async getAll(topicId, query) {
    const page = query.page ? parseInt(query.page, 10) : 1;
    const pageSize = query.pageSize ? parseInt(query.pageSize, 10) : 10;
    const totalItems = await this.Message.count({
      where: { topicId },
    });
    const pageCount = Math.ceil(totalItems / pageSize);

    const data = await this.Message.findAll(
      paginate({
        where: { topicId },
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

  create(userId, topicId, data) {
    return this.Message.create({
      ...data,
      topicId,
      createdBy: userId,
      updatedBy: userId,
    });
  }
}

module.exports = MessagesService;
