const { ERRORS_MESSAGE, ERRORS_TYPE } = require('../errors');
const { productsModel } = require('../models');

const findAll = async () => {
  const result = await productsModel.findAll();

  if (!result || result.length === 0) {
    return {
      type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
      message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
    };
  }

  return result;
};

const findById = async (id) => {
  const result = await productsModel.findById(id);

  if (!result || result.length === 0) {
    return {
      type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
      message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
    };
  }

  return result;
};

const findByQuery = async (query) => {
  const result = await productsModel.findByQuery(query);

  if (!result) {
    return {
      type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
      message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
      error: new Error('Nenhum resultado retornado'),
    };
  }

  return result;
};

const create = async (data) => {
  const result = await productsModel.create(data);

  if (!result) {
    console.log('inside result if', ERRORS_TYPE);
    return {
      type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
      message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
    };
  }

  return result;
};

const update = async (id) => {
  const result = await productsModel.update(id);

  if (!result) {
    return {
      type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
      message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
      error: new Error('Nenhum resultado retornado'),
    };
  }

  return result;
};

const remove = async (id) => {
  const result = await productsModel.remove(id);

  if (!result) {
    return {
      type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
      message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
      error: new Error('Nenhum resultado retornado'),
    };
  }

  return result;
};

module.exports = {
  findAll,
  findById,
  findByQuery,
  create,
  update,
  remove,
};