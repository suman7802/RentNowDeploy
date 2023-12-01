require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

async function uploadPhotos(photoArray, userId, postId) {
  await cloudinary.api.delete_resources_by_prefix(
    `rentNow/${userId}/${postId}/`
  );
  const uploadPromises = photoArray.map((photo, index) => {
    return cloudinary.uploader.upload(photo, {
      folder: `rentNow/${userId}/${postId}`,
      public_id: `${index}`,
    });
  });
  const results = await Promise.all(uploadPromises);
  return results.map((result) => result?.secure_url);
}

module.exports = uploadPhotos;
