const BaseError = require('./BaseError');
class APIerror extends BaseError {
  constructor(message, code) {
    super(message, code);
  }
}

module.exports = APIerror;
