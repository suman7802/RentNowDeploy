require('dotenv').config;
const JWT = require('jsonwebtoken');

const customError = require('../errors/customError');
const User = require('../models/user');

async function validateToken(req, res, next) {
  const token = req.cookies['rentNow'];
  if (!token) {
    const error = new customError('Token not found', 401);
    return next(error);
  }

  const verified = JWT.verify(token, process.env.JWT_SECRET);
  if (!verified) {
    const error = new customError('Unauthorized', 401);
    return next(error);
  }

  const user = await User.findOne({email: verified.email});

  req.user = user;
  next();
}

module.exports = validateToken;
