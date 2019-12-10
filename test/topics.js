/* eslint-disable no-undef */
require('dotenv').config();
require('module-alias/register');

process.env.ENV = 'test';

const { status } = require('@helpers/http');
const axios = require('axios');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const Growsary = require('@Growsary');
const growsary = new Growsary();

const resources = growsary.load();

const { server } = resources;
const { models } = resources.growsary;

const {
  Topic,
  Message,
  User,
} = models;

chai.use(chaiHttp);

describe('Topics', () => {
  let user, token;
  const createTopic = async(authToken) => {
    const topicRes = await axios.post(`${process.env.API_URL}/topic`, {
      subject: 'Subject 1',
      description: 'The quick brown fox',
    }, {
      headers: {
        'X-Access-Token': authToken,
      },
    });

    return topicRes.data.data;
  };

  before(async() => {
    await Message.destroy({ where: {} });
    await Topic.destroy({ where: {} });
    await User.destroy({ where: {} });

    const registerRes = await axios
      .post(`${process.env.API_URL}/user/register`, {
        email: 'test@growsary.com',
        name: 'Test Account',
        password: 'Password123',
      });
    user = registerRes.data.data;

    const loginRes = await axios
      .post(`${process.env.API_URL}/user/login`, {
        email: 'test@growsary.com',
        password: 'Password123',
      });
    token = loginRes.data.data.token;
  });

  describe('GET /topics', () => {
    beforeEach(async() => {
      await Message.destroy({ where: {} });
      await Topic.destroy({ where: {} });
    });

    it('should return all Topics', async() => {
      const topics = [
        {
          subject: 'Subject 1',
          description: 'The quick brown fox',
          createdBy: user.id,
          updatedBy: user.id,
        },
        {
          subject: 'Subject 2',
          description: 'Jumps over the lazy dog',
          createdBy: user.id,
          updatedBy: user.id,
        },
      ];

      await Topic.bulkCreate(topics)
        .then(() => {
          chai.request(server)
            .get('/topics')
            .set('X-Access-Token', token)
            .end((_err, res) => {
              expect(res.body.error).to.equal(null);
              expect(res.body.success).to.equal(true);
              expect(res.body.status).to.equal(status.OK);
            });
        });
    });

    it('should not be authorized', async() => {
      chai.request(server)
        .get('/topic/test')
        .end((_err, res) => {
          expect(res.body.error).to.equal(
            'Please provide your authentication token'
          );
          expect(res.body.success).to.equal(false);
          expect(res.body.status).to.equal(status.UNAUTHORIZED);
        });
    });
  });

  describe('GET /topic/:id', () => {
    beforeEach(async() => {
      await Message.destroy({ where: {} });
      await Topic.destroy({ where: {} });
    });

    it('should return one Topic based on indicated ID', async() => {
      const topic = await createTopic(token);

      chai.request(server)
        .get(`/topic/${topic.id}`)
        .set('X-Access-Token', token)
        .end((_err, res) => {
          expect(res.body.data.id).to.equal(topic.id);
          expect(res.body.data.subject).to.equal(topic.subject);
          expect(res.body.data.description).to.equal(topic.description);
          expect(res.body.success).to.equal(true);
          expect(res.body.status).to.equal(status.OK);
        });
    });

    it('should not be authorized', async() => {
      chai.request(server)
        .get('/topics')
        .end((_err, res) => {
          expect(res.body.error).to.equal(
            'Please provide your authentication token'
          );
          expect(res.body.success).to.equal(false);
          expect(res.body.status).to.equal(status.UNAUTHORIZED);
        });
    });

    it('should not be found', async() => {
      const nonExistingId = '1234-5678-asdf-cvbb-mbnv';

      chai.request(server)
        .get(`/topic/${nonExistingId}`)
        .set('X-Access-Token', token)
        .end((_err, res) => {
          expect(res.body.error).to.equal(
            `No topics found: ${nonExistingId}`,
          );
          expect(res.body.success).to.equal(false);
          expect(res.body.status).to.equal(status.NOT_FOUND);
        });
    });
  });

  describe('POST /topic', () => {
    const topic = {
      subject: 'Subject 1',
      description: 'The quick brown fox',
    };

    it('should create new Topic', () => {
      chai.request(server)
        .post('/topic')
        .set('X-Access-Token', token)
        .send(topic)
        .end((_err, res) => {
          expect(res.body.data.subject).to.equal(topic.subject);
          expect(res.body.data.description).to.equal(topic.description);
          expect(res.body.success).to.equal(true);
          expect(res.body.status).to.equal(status.CREATED);
        });
    });

    it('should not be authorized', async() => {
      chai.request(server)
        .post('/topic')
        .send(topic)
        .end((_err, res) => {
          expect(res.body.error).to.equal(
            'Please provide your authentication token'
          );
          expect(res.body.success).to.equal(false);
          expect(res.body.status).to.equal(status.UNAUTHORIZED);
        });
    });
  });

  describe('PATCH /topic/:id', () => {
    const newValues = {
      subject: 'Subject 1 new',
      description: 'Description 1 new',
    };

    beforeEach(async() => {
      await Message.destroy({ where: {} });
      await Topic.destroy({ where: {} });
    });

    it('should update indicated Topic based on ID', async() => {
      const topic = await createTopic(token);

      const res = await axios.patch(
        `${process.env.API_URL}/topic/${topic.id}`, newValues, {
          headers: {
            'X-Access-Token': token,
          },
        }
      );

      expect(res.data.status).to.equal(status.OK);
      expect(res.data.error).to.equal(null);
      expect(res.data.data.subject).to.equal(newValues.subject);
      expect(res.data.data.description).to.equal(newValues.description);
    });
  });

  describe('DELETE /topic/:id', () => {
    beforeEach(async() => {
      await Message.destroy({ where: {} });
      await Topic.destroy({ where: {} });
    });

    it('should delete one Topic based on indicated ID', async() => {
      const topic = await createTopic(token);

      await axios.delete(`${process.env.API_URL}/topic/${topic.id}`, {
        headers: {
          'X-Access-Token': token,
        },
      });

      chai.request(server)
        .get(`/topic/${topic.id}`)
        .set('X-Access-Token', token)
        .end((_err, res) => {
          expect(res.body.error).to.equal(
            `No topics found: ${topic.id}`,
          );
          expect(res.body.success).to.equal(false);
          expect(res.body.status).to.equal(status.NOT_FOUND);
        });
    });
  });
});
