const express = require('express');
const { productsController } = require('../controllers');
const { productMiddleware } = require('../middlewares');

const productsRouter = express.Router();

productsRouter.get('/', productsController.findAll);

productsRouter.get('/:id', productsController.findById);

productsRouter.get('/search', productsController.findByQuery);

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