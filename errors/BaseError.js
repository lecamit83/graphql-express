class BaseError extends Error {
  constructor(message, code) {
    super(message);
    this.message = message;
    this.code = code;
  }

  toJSON() {
    return {
      message : this.message,
      code : this.code
    }
  }
}

module.exports = BaseError;
