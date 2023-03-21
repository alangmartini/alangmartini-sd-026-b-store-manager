const { productsService } = require('../services');

const findAll = async (req, res) => {
 const result = await productsService.findAll();

 if (result.type) {
  const error = result;
  return res.status(404).json({ message: error.message });
 }

 return res.status(200).json(result);
};

const findById = async (req, res) => {
 const result = await productsService.findById(id);

 if (result.type) {
  const error = result;
  return res.status(404).json(error);
 }

 return res.status(200).json(result);
};
const findByQuery = async (req, res) => {
 const result = await productsService.findByQuery(query);

 if (result.type) {
  const error = result;
  return res.status(404).json(error);
 }

 return res.status(200).json(result);
};
const create = async (req, res) => {
 const result = await productsService.create(data);

 if (result.type) {
  const error = result;
  return res.status(404).json(error);
 }

 return res.status(200).json(result);
};
const update = async (req, res) => {
 const result = await productsService.update(id);

 if (result.type) {
  const error = result;
  return res.status(404).json(error);
 }

 return res.status(200).json(result);
};
const remove = async (req, res) => {
 const result = await productsService.delete(id);

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
