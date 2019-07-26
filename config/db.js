const mongoose = require('mongoose');
const { DB_HOST, DB_PORT, DB_NAME } = process.env;
function localConnect() {
  mongoose.Promise = global.Promise;
  mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useCreateIndex : true,
    useNewUrlParser : true
  }, function(error) {
    if(error) throw error;
    console.log('Connected Database!');
  });
}
module.exports = {
  localConnect
}
