const productsSchema = require('./validations/products.schema');

const decideStatusCode = (errorMessage) => {
  if (errorMessage.includes('is required')) {
    return 400;
  }
  if (errorMessage.includes('characters long')) {
    return 422;
  }
}


const validateName = (req, res, next) => {
  const { name } = req.body
  const error = productsSchema.nameSchema.validate(name);
  
  if (error.error) {
    const errorMessage = error.error.message;
    return res
      .status(decideStatusCode(errorMessage))
      .json({ message: errorMessage });
  }

  next();
};

module.exports = {
  validateName,
};