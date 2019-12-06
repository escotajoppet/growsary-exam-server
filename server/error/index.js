class GrowsaryError extends Error {
  constructor(name, message, status = 500, errorFields = undefined) {
    super(message);

    this.name = name;
    this.message = message;
    this.status = status;
    this.errorFields = errorFields;
  }
}

module.exports = GrowsaryError;
