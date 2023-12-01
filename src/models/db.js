require('dotenv').config();
const mongoose = require('mongoose');
const URI = process.env.URI;

async function connectDB() {
  await mongoose.connect(URI).then(console.log(`connected to db`));
}

module.exports = connectDB;
