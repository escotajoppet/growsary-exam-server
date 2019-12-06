const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { status, dispatch } = require('@helpers/http');

const PORT = 3001;
const app = express();

const load = (resources) => {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());

  registerRoutes(resources);
  handleError();

  app.listen(PORT, _ => {
    console.log(`\nGrowsary server running on port ${PORT}...`);
  });
};

const addRoute = (context, route, resources) => {
  const name = `${context}/${route.split('/').pop().split('.')[0]}`;

  console.log(`Adding route: ${name}`);

  require(route)(app, resources);
};

const registerRoutes = (resources) => {
  const routePath = path.join(__dirname, 'routes', 'api');

  fs
    .readdirSync(routePath)
    .filter(context => {
      const routeFiles = fs
        .readdirSync(`${routePath}/${context}`);

      for (const file of routeFiles)
        addRoute(context, `${routePath}/${context}/${file}`, resources);
    });
};

const handleError = () => {
  app.use((err, _req, res, _next) => {
    const statusCode = err.status || status.INTERNAL_SERVER_ERROR;
    const error = err.message || status[statusCode];

    console.log(`
      status | ${statusCode}
      name | ${err.name}
      message | ${err.message}
      errorFields | ${err.errorFields}
    `);

    res.status(statusCode).send(
      dispatch({
        error,
        success: false,
        status: statusCode,
        userFields: err.errorFields,
      }),
    );
  });
};

// Set up the express app
module.exports = {
  load,
};
