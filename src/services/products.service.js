const { productsModel } = require('../models');

const findAll = async () => {
  const result = productsModel.findAll();

  if (!result) {
    return {
      type: ERRORS_TYPE.NOT_FOUND,
      message: ERRORS_MESSAGE.NOT_FOUND,
      error: new Error('Nenhum resultado retornado'),
    }
  }

  return result;
};

const findById = async (id) => {
  const result = productsModel.findById(id);

  if (!result) {
    return {
      type: ERRORS_TYPE.NOT_FOUND,
      message: ERRORS_MESSAGE.NOT_FOUND,
      error: new Error('Nenhum resultado retornado'),
    }
  }

  return result;
};

const findByQuery = async (query) => {
  const result = productsModel.findByQuery(query);

  if (!result) {
    return {
      type: ERRORS_TYPE.NOT_FOUND,
      message: ERRORS_MESSAGE.NOT_FOUND,
      error: new Error('Nenhum resultado retornado'),
    }
  }

  return result;
};

const create = async (data) => {
  const result = productsModel.create(data);

  if (!result) {
    return {
      type: ERRORS_TYPE.NOT_FOUND,
      message: ERRORS_MESSAGE.NOT_FOUND,
      error: new Error('Nenhum resultado retornado'),
    }
  }

  return result;
};

const update = async (id) => {
  const result = productsModel.update(id);

  if (!result) {
    return {
      type: ERRORS_TYPE.NOT_FOUND,
      message: ERRORS_MESSAGE.NOT_FOUND,
      error: new Error('Nenhum resultado retornado'),
    }
  }

  return result;
};

const remove = async (id) => {
  const result = productsModel.remove(id);

  if (!result) {
    return {
      type: ERRORS_TYPE.NOT_FOUND,
      message: ERRORS_MESSAGE.NOT_FOUND,
      error: new Error('Nenhum resultado retornado'),
    }
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