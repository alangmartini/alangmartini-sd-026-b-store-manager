const { salesService } = require('../services');

const findAll = async (req, res) => {
 const result = salesService.findAll();

 if (result.type) {
  const error = result;
  return res.status(404).json(error);
 }

 return res.status(200).json(result);
};
const findById = async (req, res) => {
 const result = salesService.findById(id);

 if (result.type) {
  const error = result;
  return res.status(404).json(error);
 }

 return res.status(200).json(result);
};
const findByQuery = async (req, res) => {
 const result = salesService.findByQuery(query);

 if (result.type) {
  const error = result;
  return res.status(404).json(error);
 }

 return res.status(200).json(result);
};
const create = async (req, res) => {
 const result = salesService.create(id);

 if (result.type) {
  const error = result;
  return res.status(404).json(error);
 }

 return res.status(200).json(result);
};
const update = async (req, res) => {
 const result = salesService.update(id);

 if (result.type) {
  const error = result;
  return res.status(404).json(error);
 }

 return res.status(200).json(result);
};
const remove = async (req, res) => {
 const result = salesService.delete(id);

 if (result.type) {
  const error = result;
  return res.status(404).json(error);
 }

 return res.status(200).json(result);
};

module.exports = {
  findAll,
  findById,
  findByQuery,
  create,
  update,
  remove
};