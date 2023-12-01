const express = require('express');
const propertyRouter = express.Router();

const property = require('../controllers/propertyController');
const validateToken = require('../middlewares/validateToken');

propertyRouter.get('/', property.readAll);
propertyRouter.get('/query', property.readByQuery);

propertyRouter.get('/private', validateToken, property.private);
propertyRouter.put('/', validateToken, property.update);
propertyRouter.post('/', validateToken, property.create);
propertyRouter.delete('/', validateToken, property.delete);

module.exports = propertyRouter;
