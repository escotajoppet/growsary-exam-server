const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

module.exports = {
  load: sequelize => {
    const models = {};
    const modelsPath = path.join(__dirname);

    const modelFiles = fs
      .readdirSync(modelsPath)
      .filter(file => {
        return (
          file.indexOf('.') !== 0) &&
          (file !== basename) && (file.slice(-3) === '.js'
        );
      });

    for (const file of modelFiles) {
      const model = sequelize['import'](path.join(modelsPath, file));

      models[model.name] = model;
    }

    for (const name in models) {
      console.log(`Adding model: ${name}`);

      if (models[name].associate) {
        models[name].associate(models);
      }
    }

    return models;
  },
};
