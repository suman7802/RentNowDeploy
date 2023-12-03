require('dotenv').config();
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const User = require('../models/user');
const catchAsync = require('../errors/catchAsync');
const customError = require('../errors/customError');

const user = {
  register: catchAsync(async (req, res, next) => {
    const {email, password, fullName} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const userExist = await User.findOne({email});

    if (userExist) {
      const error = new customError('user already exist', 409);
      return next(error);
    }

    await new User({
      email,
      password: hashedPassword,
      fullName,
    }).save();

    return res.status(201).json({status: 201, message: 'user registered'});
  }),

  login: catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) {
      const error = new customError("user don't exist", 404);
      return next(error);
    }

    const passwordMatched = bcrypt.compareSync(password, user.password);
    if (!passwordMatched) {
      const error = new customError("credential doesn't match", 401);
      return next(error);
    }

    const token = JWT.sign({email: user.email}, process.env.JWT_SECRET);

    return res
      .cookie('rentNow', token, {
        path: '/',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .json({
        status: 200,
        message: 'login success',
        data:user
      });
  }),
};

module.exports = user;
