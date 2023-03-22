const express = require('express');
const { productsController } = require('../controllers');
const { productMiddleware } = require('../middlewares');

const productsRouter = express.Router();

productsRouter.get('/search', productsController.findByQuery);

productsRouter.get('/:id', productsController.findById);

productsRouter.get('/', productsController.findAll);

productsRouter.post(
  '/',
  productMiddleware.validateName,
  productsController.create,
);

productsRouter.put('/:id',
  productMiddleware.validateName,
  productsController.update);

productsRouter.delete('/:id',
  productsController.remove);

module.exports = productsRouter;