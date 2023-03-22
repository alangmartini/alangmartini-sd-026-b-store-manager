const snakeize = require('snakeize');
const { connection } = require('./connection');

const tableName = 'products';

const findAll = async () => {
  const [result] = await connection.execute(`
    SELECT * FROM StoreManager.products
    `);

  return result;
};

const findById = async (id) => {
  const [[result]] = await connection.execute(`
    SELECT * FROM products WHERE id = ?;
  `, [id]);

  return result;
};

const findByQuery = async (query) => {
  const [result] = await connection.execute(`
    SELECT * FROM ${tableName} WHERE name LIKE '%?%';
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
    .join(', ');

  const [{ insertId: result }] = await connection.execute(
    `
    INSERT INTO ${tableName} (${columns})
    VALUES (${placeholders});
  `,
    [...Object.values(data)],
  );

  return result;
};

const update = async (id, data) => {
  const columns = Object.keys(data);

  const placeholders = columns.map((column) => `${column} = ?`).join(', ');

  const updateQuery = `
      UPDATE products
      SET ${placeholders}
      WHERE id = ?;
    `;
  
  try {
    const [result] = await connection.execute(
      updateQuery,
      [...Object.values(data), id],
    );
    return result;
  } catch (error) {
    return error;
  }
};

const remove = async (id) => {
  try {
    const [result] = await connection.execute(`
      DELETE FROM products WHERE id = ?;
    `, [id]);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findAll,
  findById,
  findByQuery,
  create,
  update,
  remove,
};