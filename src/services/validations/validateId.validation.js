const { ERRORS_TYPE, ERRORS_MESSAGE } = require('../../errors');

const validateIdIsExistent = async (id, findByIdFn, type = 'PRODUCT') => {
  const isExistent = await findByIdFn(id);
  
  if (!isExistent || !isExistent.length > 0) {
    return {
      type: ERRORS_TYPE[`${type}_NOT_FOUND`],
      message: ERRORS_MESSAGE[`${type}_NOT_FOUND`],
    };
  }

  return isExistent;
};

module.exports = {
  validateIdIsExistent,
};
