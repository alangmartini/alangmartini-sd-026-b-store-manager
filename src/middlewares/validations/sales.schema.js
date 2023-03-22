const JOI = require('joi');

const PRODUCT_ID_MESSAGES = {
  'any.required': '"productId" is required',
};

const QUANTITY_MESSAGES = {
  'any.required': '"quantity" is required',
  'number.min': '"quantity" must be greater than or equal to 1',
};

const productIdSchema = JOI.number().required().messages(PRODUCT_ID_MESSAGES);

const quantitySchema = JOI.number().min(1).required().messages(QUANTITY_MESSAGES);

const salesSchema = JOI.object({
  productId: productIdSchema,
  quantity: quantitySchema,
});

const salesArraySchema = JOI.array().items(salesSchema).min(1).required();

module.exports = {
  productIdSchema,
  quantitySchema,
  salesArraySchema,
  PRODUCT_ID_MESSAGES,
  QUANTITY_MESSAGES,
};
