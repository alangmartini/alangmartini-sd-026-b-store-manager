const express = require('express');
const { salesController } = require('../controllers');
const { salesMiddleware } = require('../middlewares');

const salesRouter = express.Router();

salesRouter.get('/', salesController.findAll);
salesRouter.get('/:id', salesController.findById);
salesRouter.get('/search', salesController.findByQuery);

salesRouter.post(
  '/',
  salesMiddleware.validateQuantityAndProductId,
  salesController.create,
);

salesRouter.put('/:id', salesController.update);
salesRouter.delete('/:id', salesController.remove);

module.exports = salesRouter;