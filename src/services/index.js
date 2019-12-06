const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

module.exports = {
  load: resources => {
    const services = {};
    const servicesPath = path.join(__dirname);

    const servicesFiles = fs
      .readdirSync(servicesPath)
      .filter(file => {
        return (
          file.indexOf('.') !== 0) &&
          (file !== basename) && (file.slice(-3) === '.js'
        );
      });

    for (const file of servicesFiles) {
      const Service = require(`./${file}`);
      const service = new Service(resources);

      console.log(`Adding service: ${service.constructor.name}`);

      services[service.constructor.name] = service;
    }

    return services;
  },
};
