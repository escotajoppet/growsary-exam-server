const dispatch = (obj) => {
  const defaults = {
    data: {},
    error: null,
    success: true,
    status: 200,
    errorFields: undefined,
  };

  return {
    ...defaults,
    ...obj,
  };
};

module.exports = dispatch;
