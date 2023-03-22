const { ERRORS_MESSAGE, ERRORS_TYPE } = require('../errors');
const { salesModel } = require('../models');
const { validateId } = require('./validations');

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

  const format = result.map((sale) => ({
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));

  return format;
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

const multipleValidate = async (id, data) => {
  const error = await validateId.validateIdIsExistent(
    [id],
    salesModel.findByIdSales,
    'SALE',
  );

  if (error.type) {
    return error;
  }

  const productValidationPromises = data.map((sales) =>
    validateId.validateIdIsExistent([sales.productId], salesModel.findByIdSales));

  const productValidation = await Promise.all(productValidationPromises);

  if (productValidation.some((validation) => validation.type)) {
    return {
      type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
      message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
    };
  }
};

const update = async (id, data) => {
  const validation = await multipleValidate(id, data);

  if (validation) {
    return validation;
  }

  const result = await salesModel.updateMultiple(id, data);

  if (!result || result.length === 0) {
    return {
      type: ERRORS_TYPE.SALE_NOT_FOUND,
      message: ERRORS_MESSAGE.SALE_NOT_FOUND,
    };
  }

  const format = {
    saleId: id,
    itemsUpdated: data,
  };

  return format;
};

const remove = async (id) => {
  const error = await validateId.validateIdIsExistent(
    [id],
    salesModel.findByIdSales,
    'SALE',
    );
    
  if (error.type) {
    return error;
  }
  
  const result = await salesModel.remove([id]);

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