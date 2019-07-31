const JWT = require('jsonwebtoken');
function getUserId(token) {
  try {
    if(token) {
      const decoded = JWT.verify(token, process.env.SECRET_KEY_JWT);
      return decoded._id;      
    }
    return null;
  } catch (error) {
    return null;
  }
}

function isAuth(req) {
  const bearer_token = req.headers['authorization'] || '';
  const token = bearer_token.replace('Bearer ', '');
  const userId = getUserId(token);
  return {
    userId : userId,
    isAuth : userId !== null,
  };
}
module.exports = {
  isAuth
}
