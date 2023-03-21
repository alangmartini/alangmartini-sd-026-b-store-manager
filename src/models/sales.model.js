const { ERRORS_TYPE, ERRORS_MESSAGE } = require('../errors');
const { connection } = require('./connection');
const snakeize = require('snakeize');

const tableName = 'sales';
const junctionTableName = 'sales_products'

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
  const { productId } = data[0];

  const [isExistent] = await connection.execute(`
  SELECT * FROM products WHERE id = ?
  `, [productId]);
  
  if (!isExistent) {
    return {
      type: ERRORS_TYPE.INVALID_ID,
      message: ERRORS_MESSAGE.INVALID_ID,
    }
  }

  const [{ insertId }] = await connection.execute(`
  INSERT INTO sales (date)
  VALUES (CURRENT_TIMESTAMP);
  `, []);
  
  const values = [insertId, data[0].quantity, data[0].productId]
  console.log('values is:', values);

  const [result] = await connection.execute(`
    INSERT INTO sales_products (sale_id, quantity, product_id)
    VALUES (?, ?, ?);
  `, values);

  return insertId;
};

const createMultiple = async (data) => {
  const placeHolders = data
  .map((_sales, index) => {
    const lastIndex = data.length - 1;
    if (index !== lastIndex) {
      return `id = ? OR`;
    } else {
      return `id = ?`;
    }
  })
  .join(" ");
  
  const idsProducts = data.map((sale) => sale.productId);

  const [isExistent] = await connection.execute(
    `
      SELECT * FROM products WHERE ${placeHolders};
    `,
    idsProducts
  );


  if (!isExistent) {
    return {
      type: ERRORS_TYPE.INVALID_ID,
      message: ERRORS_MESSAGE.INVALID_ID,
    }
  }

  const [{ insertId }] = await connection.execute(
    `
      INSERT INTO sales (date)
      VALUES (CURRENT_TIMESTAMP)
    `
  );

  const columns = ['product_id', 'sale_id', 'quantity']

  const placeholders = data.map(() => "(?, ?, ?)").join(", ");

  const saleId = insertId;

  const allValues = [];
  const values = data.forEach((sale) => {
    allValues.push(sale.productId);
    allValues.push(saleId);
    allValues.push(sale.quantity);
  });
  
  await connection.execute(
    `
    INSERT INTO ${junctionTableName} (${columns})
    VALUES ${placeholders};
    `, allValues
  );
  
  return insertId;
}

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
  createMultiple,
  update,
  remove,
};