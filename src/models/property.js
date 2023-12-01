const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    bhk: {
      type: Number,
    },
    room: {
      type: Number,
    },
    rent: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
    },
    created: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
    },
    contact: {
      phoneNumber: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },

  {versionKey: false}
);

module.exports = mongoose.model('Property', propertySchema);
