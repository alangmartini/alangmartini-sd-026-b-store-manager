const salesModel = require('../models');

const findAll = async () => {
  const result = salesModel.findAll(id);

  if (!result) {
    return {
      type: ERRORS_TYPE.NOT_FOUND,
      message: ERRORS_MESSAGE.NOT_FOUND,
      error: new Error('Nenhum resultado retornado'),
    }
  }

  return result;
};

const findById = async () => {
  const result = salesModel.findById(id);

  if (!result) {
    return {
      type: ERRORS_TYPE.NOT_FOUND,
      message: ERRORS_MESSAGE.NOT_FOUND,
      error: new Error('Nenhum resultado retornado'),
    }
  }

  return result;
};

const findBy = async () => {
  const result = salesModel.findBy(id);

  if (!result) {
    return {
      type: ERRORS_TYPE.NOT_FOUND,
      message: ERRORS_MESSAGE.NOT_FOUND,
      error: new Error('Nenhum resultado retornado'),
    }
  }

  return result;
};

const create = async () => {
  const result = salesModel.create(id);

  if (!result) {
    return {
      type: ERRORS_TYPE.NOT_FOUND,
      message: ERRORS_MESSAGE.NOT_FOUND,
      error: new Error('Nenhum resultado retornado'),
    }
  }

  return result;
};

const update = async () => {
  const result = salesModel.update(id);

  if (!result) {
    return {
      type: ERRORS_TYPE.NOT_FOUND,
      message: ERRORS_MESSAGE.NOT_FOUND,
      error: new Error('Nenhum resultado retornado'),
    }
  }

  return result;
};

const remove = async () => {
  const result = salesModel.remove(id);

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
  findBy,
  create,
  update,
  remove,
};