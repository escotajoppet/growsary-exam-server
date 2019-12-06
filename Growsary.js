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
    this._loadServer();
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
    Server.load(this.resources);
  }
};

module.exports = Growsary;
