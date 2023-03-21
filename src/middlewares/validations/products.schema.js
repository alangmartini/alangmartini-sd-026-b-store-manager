const JOI = require('joi');

const nameSchema = JOI.string().min(5).required().messages({
  "string.base": '"name" should be a type of text',
  "string.empty": '"name" cannot be empty',
  "any.required": '"name" is required',
  "string.min": '\"name\" length must be at least 5 characters long',
});

module.exports = {
  nameSchema,
};