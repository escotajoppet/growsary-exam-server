const Models = require('@models');
const Services = require('@services');
const Server = require('@server');
const { Connection } = require('@database');

class Growsary {
  constructor() {
    this.resources = {};
  }

  load() {
    this._loadData();
    this._loadServices();

    if (process.env.ENV === 'test') {
      const app = this._loadServer();
      this.resources.server = app;

      return this.resources;
    } else {
      this._loadServer();
    }
  }

  // private methods

  _loadData() {
    this.resources.growsary = Connection;

    this.resources.growsary.models = Models.load(this.resources.growsary);
  }

  _loadServices() {
    this.resources.services = Services.load(this.resources);
  }

  _loadServer() {
    return Server.load(this.resources);
  }
};

module.exports = Growsary;
