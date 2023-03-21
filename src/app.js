const express = require('express');

const app = express();

app.use(express.json());

app.use('/products', productsRouter);

app.use('/sales', salesRoutes);

module.exports = app;