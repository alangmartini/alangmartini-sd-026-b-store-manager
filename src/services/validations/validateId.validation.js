const { ERRORS_TYPE, ERRORS_MESSAGE } = require('../../errors');

const validateIdIsExistent = async (id, findByIdFn) => {
  const isExistent = await findByIdFn(id);

  if (!isExistent || isExistent.length > 0) {
    return {
      type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
      message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
    };
  }

  return isExistent;
};

module.exports = {
  validateIdIsExistent,
};