const { ERRORS_TYPE, ERRORS_MESSAGE } = require('../errors');
const { connection } = require('./connection');

const tableName = 'sales';
const junctionTableName = 'sales_products';

const findAll = async () => {
  const [result] = await connection.execute(`
  SELECT *
  FROM sales
  INNER JOIN sales_products AS sp ON sp.sale_id = sales.id 
  ;
  `);

    const format = result.map((sale) => ({
      date: sale.date,
      saleId: sale.sale_id,
      productId: sale.product_id,
      quantity: sale.quantity,
    }));

  return format;
};

const findById = async (id) => {
  const [result] = await connection.execute(`
  SELECT *
  FROM sales
  INNER JOIN sales_products AS sp ON sp.sale_id = sales.id
  WHERE sales.id = ?;
  `, [id]);
  
  const format = result.map((sale) => ({
      date: sale.date,
      productId: sale.product_id,
      quantity: sale.quantity,
    }));

  return format;
};
const findByIdJOIN = async (id) => {
  const [result] = await connection.execute(
    `
  SELECT *
  FROM sales
  INNER JOIN sales_products AS sp ON sp.sale_id = sales.id
  WHERE sales.id = ?;
  `,
    [id],
  );

  return result;
};

const findByIds = async (placeHolders, data) => {
  const idsProducts = data.map((sale) => sale.productId);

  const [isExistent] = await connection.execute(
    `
      SELECT * FROM products WHERE ${placeHolders};
    `,
    idsProducts,
  );
  
  return isExistent;
};

// const findByQuery = async (query) => {
//   const [result] = await connection.execute(`
//     SELECT * FROM ${tableName} WHERE  LIKE '%?%';
//   `, [query]);

//   return result;
// };

const insertIntoSales = async () => {
  const [{ insertId }] = await connection.execute(`
  INSERT INTO sales (date)
  VALUES (CURRENT_TIMESTAMP);
  `, []);

  return insertId;
};

const create = async (data) => {  
  const { productId } = data[0];

  const isExistent = await findByIdJOIN(productId);
  
  if (!isExistent || isExistent.length === 0) {
    return {
      type: ERRORS_TYPE.INVALID_ID,
      message: ERRORS_MESSAGE.INVALID_ID,
    };
  }

  const insertId = await insertIntoSales();
  
  const values = [insertId, data[0].quantity, data[0].productId];

  await connection.execute(`
    INSERT INTO sales_products (sale_id, quantity, product_id)
    VALUES (?, ?, ?);
  `, values);

  return insertId;
};

const constructPlaceHolders = (data) => {
  const placeHolders = data
    .map((_sales, index) => {
      const lastIndex = data.length - 1;
      if (index !== lastIndex) {
        return 'id = ? OR';
      }
      return 'id = ?';
    })
    .join(' ');
  
  return placeHolders;
};

const createMultiple = async (data) => {
  const placeHolders = constructPlaceHolders(data);
  
  const isExistent = await findByIds(placeHolders, data);

  if (!isExistent || isExistent.length === 0 || isExistent.length !== data.length) {
    return { type: ERRORS_TYPE.INVALID_ID,
      message: ERRORS_MESSAGE.INVALID_ID,
    };
  }

  const insertId = await insertIntoSales();

  const columns = ['product_id', 'sale_id', 'quantity'];

  const placeholders = data.map(() => '(?, ?, ?)').join(', ');

  const saleId = insertId;

  const allValues = data.reduce((acc, sale) => {
    acc.push(...[sale.productId, saleId, sale.quantity]);
    return acc;
  }, []);

  await connection.execute(` INSERT INTO ${junctionTableName} (${columns})
    VALUES ${placeholders};`, allValues);

  return insertId;
};

const update = async (id, data) => {
  const placeHolders = Object
    .entries(data)
    .map(() => '? = ?')
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
  `, [id]);

  return result;
};

module.exports = {
  findAll,
  findById,
  findByIds,
  // findByQuery,
  insertIntoSales,
  create,
  createMultiple,
  update,
  remove,
};