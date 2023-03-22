const { ERRORS_MESSAGE, ERRORS_TYPE } = require('../errors');
const { salesModel } = require('../models');

const findAll = async () => {
  const result = await salesModel.findAll();

  if (!result || result.length === 0) {
    return {
      type: ERRORS_TYPE.SALE_NOT_FOUND,
      message: ERRORS_MESSAGE.SALE_NOT_FOUND,
    };
  }

  return result;
};

const findById = async (id) => {
  const result = await salesModel.findById(id);

  if (!result || result.length === 0) {
    return {
      type: ERRORS_TYPE.SALE_NOT_FOUND,
      message: ERRORS_MESSAGE.SALE_NOT_FOUND,
    };
  }

  return result;
};

const findByQuery = async (query) => {
  const result = salesModel.findByQuery(query);

  if (!result || result.length === 0) {
    return {
      type: ERRORS_TYPE.SALE_NOT_FOUND,
      message: ERRORS_MESSAGE.SALE_NOT_FOUND,
    };
  }

  return result;
};

const create = async (data) => {
  let result;
  if (data.length === 1) {
    result = await salesModel.create(data);
  }

  if (data.length > 1) {
    result = await salesModel.createMultiple(data);
  }

  if (result.type) {
    return {
      type: ERRORS_TYPE.INVALID_ID,
      message: ERRORS_MESSAGE.INVALID_ID,
    };
  }

  const constructedSalesObject = {
    id: result,
    itemsSold: data,
  };

  return constructedSalesObject;
};

const update = async (id) => {
  const result = salesModel.update(id);

  if (!result || result.length === 0) {
    return {
      type: ERRORS_TYPE.SALE_NOT_FOUND,
      message: ERRORS_MESSAGE.SALE_NOT_FOUND,
    };
  }

  return result;
};

const remove = async (id) => {
  const result = salesModel.remove(id);

  if (!result || result.length === 0) {
    return {
      type: ERRORS_TYPE.SALE_NOT_FOUND,
      message: ERRORS_MESSAGE.SALE_NOT_FOUND,
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