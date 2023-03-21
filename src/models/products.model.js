const { connection } = require('./connection');

const tableName = '';

const findAll = async () => {
  const [result] = connection.execute(`
  SELECT * FROM ${tableName};
  `)

  return result;
};

const findById = async (id) => {
  const result = connection.execute(`
    SELECT * FROM ${tableName} WHERE id = ?;
  `, [id]);

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
  const result = productsModel.findBy(id);

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
  const result = productsModel.create(id);

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

const remove = async () => {
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
  findBy,
  create,
  update,
  remove,
};