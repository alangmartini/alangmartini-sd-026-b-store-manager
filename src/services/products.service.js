const { ERRORS_MESSAGE, ERRORS_TYPE } = require('../errors');
const { productsModel } = require('../models');
const { validateId } = require('./validations');

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
    };
  }

  return result;
};

const create = async (data) => {
  const result = await productsModel.create(data);

  if (!result) {
    return {
      type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
      message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
    };
  }

  return result;
};

const update = async (id, data) => {
  const error = await validateId
    .validateIdIsExistentProduct(
    id,
    productsModel.findById,
    );
    
  if (error.type) {
    return error;
  }

  const result = await productsModel.update(id, data);

  if (result instanceof Error) {
    const errorOnInsert = result;
    return errorOnInsert;
  }

  return {
    id,
    name: data.name,
  };
};

const remove = async (id) => {
    const error = await validateId.validateIdIsExistentProduct(
      id,
      productsModel.findById,
    );

    if (error.type) {
      return error;
    }
  
  const result = await productsModel.remove(id);

  if (!result) {
    return {
      type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
      message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
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