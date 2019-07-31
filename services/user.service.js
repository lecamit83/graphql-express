const UserDAO = require('../models/user.model');
const UserValidator = require('../validations/user.validation');

function createUser(email, password) {
  try {
    UserValidator.validateInputUser(email, password);
    return UserDAO.createUser(email, password);
  } catch (error) {
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    UserValidator.validateInputUser(email, password);
    const user = await UserDAO.findByCreditials(email, password);
    const token = await user.generateToken();
    user['token'] = token;
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  loginUser,
}
