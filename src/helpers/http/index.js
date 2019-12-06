const status = require('http-status-codes');

const dispatch = (obj) => {
  const defaults = {
    data: {},
    error: null,
    success: true,
  };

  return {
    ...defaults,
    ...obj,
  };
};

module.exports = {
  status,
  dispatch,
};
