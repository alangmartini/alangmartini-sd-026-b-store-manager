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
  const { id } = req.params;

 const result = await productsService.findById(id);

 if (result.type) {
  const error = result;
  return res.status(404).json({ message: error.message });
 }

 return res.status(200).json(result);
};
const findByQuery = async (req, res) => {
  console.log('oi');
  const { q } = req.query;
 const result = await productsService.findByQuery(q);

 if (result.type) {
  const error = result;
  return res.status(404).json(error);
 }

 return res.status(200).json(result);
};
const create = async (req, res) => {
  const data = req.body;

  const insertId = await productsService.create(data);

 if (insertId.message) {
   const error = insertId;
   return res.status(404).json({ message: error.message });
 }

 return res.status(201).json({ id: insertId, name: data.name });
};

const update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

 const result = await productsService.update(id, data);

 if (result.type) {
  const error = result;
  return res.status(404).json({ message: error.message });
 }

 return res.status(200).json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;

 const result = await productsService.remove(id);

 if (result.type) {
  const error = result;
  return res.status(404).json({ message: error.message });
 }

  return res.status(204).json({});
};

module.exports = {
  findAll,
  findById,
  findByQuery,
  create,
  update,
  remove,
};
