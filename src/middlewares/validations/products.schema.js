const JOI = require('joi');

const NAME_MESSAGES = {
  'string.base': '"name" should be a type of text',
  'string.empty': '"name" cannot be empty',
  'any.required': '"name" is required',
  'string.min': '"name" length must be at least 5 characters long',
};

const nameSchema = JOI.string().min(5).required().messages({
  'string.base': NAME_MESSAGES['string.base'],
  'string.empty': NAME_MESSAGES['string.empty'],
  'any.required': NAME_MESSAGES['any.required'],
  'string.min': NAME_MESSAGES['string.min'],
});

module.exports = {
  nameSchema,
  NAME_MESSAGES,
};