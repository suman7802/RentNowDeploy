const Property = require('../models/property');
const catchAsync = require('../errors/catchAsync');
const customError = require('../errors/customError');
const uploadPhotos = require('../cloudinary/uploadPhotos');

const property = {
  create: catchAsync(async (req, res, next) => {
    const data = req.body;
    const contact = JSON.parse(req.body.contact);

    data.contact = contact;
    const userId = req.user._id;
    const images = Object.values(req?.files) || [];

    if ((images.length > 5) | (images.length < 1)) {
      const error = new customError(`images min 1 & max 5.`, 400);
      return next(error);
    }

    const post = await new Property({
      ...data,
      user: userId,
    }).save();

    const imagesPath = images.map((image) => image.tempFilePath);
    const imageUrl = await uploadPhotos(imagesPath, userId, post._id);

    post.images = imageUrl;
    await post.save();

    return res.status(201).send(post);
  }),

  readAll: catchAsync(async (req, res) => {
    await Property.find({}).then((respond) => {
      return res.send(respond);
    });
  }),

  readByQuery: catchAsync(async (req, res) => {
    const {location} = req.query;
    const regex = new RegExp(location, 'i'); // 'i' flag for case-insensitive matching
    await Property.find({
      address: {$regex: regex},
    }).then((response) => {
      return res.send(response);
    });
  }),

  private: catchAsync(async (req, res) => {
    const userId = req.user._id;
    await Property.find({user: userId}).then((respond) => {
      return res.send(respond);
    });
  }),

  update: catchAsync(async (req, res) => {
    await Property.findOneAndUpdate(
      {user: req.user._id, _id: req.body.postId},
      {$set: {...req.body}},
      {new: true}
    ).then((respond) => {
      return res.send(respond);
    });
  }),

  delete: catchAsync(async (req, res) => {
    await Property.findOneAndDelete({
      user: req.user._id,
      _id: req.body.postId,
    }).then((respond) => {
      return res.send(respond);
    });
  }),
};

module.exports = property;
