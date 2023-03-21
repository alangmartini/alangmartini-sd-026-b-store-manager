const { connection } = require('./connection');

const tableName = '';

const findAll = async () => {
  const [result] = await connection.execute(`
  SELECT * FROM ${tableName};
  `)

  return result;
};

const findById = async (id) => {
  const [result] = await connection.execute(`
    SELECT * FROM ${tableName} WHERE id = ?;
  `, [id]);

  return result;
};

const findByQuery = async (query) => {
  const [result] = await connection.execute(`
    SELECT * FROM ${tableName} WHERE ${nameColumn} LIKE '%?%';
  `, [query]);

  return result;
};

const create = async (data) => {
  const columns = Object
    .keys(snakeize(data))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object
    .keys(data)
    .map(() => '?')
    .join(', ')

  const [result] = await connection.execute(`
    INSERT INTO ${tableName} (${columns})
    VALUES (${placeholders});
  `, [...Object.values(data)]);

  return result;
};

const update = async (id, data) => {
  const placeHolders = Object
    .entries(data)
    .map(() => `? = ?`)
    .join(', ');

  const columsValuePair = [];

  Object
    .entries(data)
    .forEach((entry) => columsValuePair.push([entry[0], entry[1]]));

  const [result] = await connection.execute(`
    UPDATE ${tableName}
    SET (${placeHolders})
    WHERE id = ?;
  `, [...columsValuePair, id]);

  return result;
};

const remove = async (id) => {
  const [result] = await connection.execute(`
    DELETE FROM ${tableName} WHERE id = ?;
  `, [id])

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