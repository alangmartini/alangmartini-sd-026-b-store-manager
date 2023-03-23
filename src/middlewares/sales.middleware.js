const salesSchema = require('./validations/sales.schema');

const decideStatusCode = (errorMessage) => {
  if (errorMessage.includes('is required')) {
    return 400;
  }
  if (errorMessage.includes('greater than')) {
    return 422;
  }
  return 400;
};

const validateQuantityAndProductId = async (req, res, next) => {
  const data = req.body;
  const error = salesSchema.salesArraySchema.validate(data);

  if (error.error) {
    const errorMessage = error.error.message;
    return res
      .status(decideStatusCode(errorMessage))
      .json({ message: errorMessage });
  }

  next();
};

module.exports = {
  validateQuantityAndProductId,
};
