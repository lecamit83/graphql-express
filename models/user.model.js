const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const APIerror = require('../errors/APIerror');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email : String,
  password : String,
});

userSchema.statics.createUser = async function(email, password) {
  const user = await User.findOne({ email });
  if(user) { throw new APIerror('Email was exist!', 422); }
  return User.create({email, password});
}

userSchema.statics.findByCreditials = async function(email, password) {
  const user = await User.findOne({ email }).orFail(new APIerror('Email Incorrect!', 422)).exec();
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) { throw new APIerror('Password Incorrect', 422); }
  return user;
}

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = await JWT.sign({ _id : user._id.toString() }, process.env.SECRET_KEY_JWT);  
  return token;
}

userSchema.pre('save', async function(next) {
  const user = this;
  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password , 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
