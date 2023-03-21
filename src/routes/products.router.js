const express = require('express');
const { productsController } = require('../controllers');

const productsRouter = express.Router();

productsRouter.get('/', productsController.findAll);
productsRouter.get('/:id', productsController.findById);
productsRouter.get('/search', productsController.findByQuery);
productsRouter.post('/', productsController.create);
productsRouter.put('/:id', productsController.update);
productsRouter.delete('/:id', productsController.delete);

module.exports = productsRouter;