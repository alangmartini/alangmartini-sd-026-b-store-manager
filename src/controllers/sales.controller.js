const { salesService } = require('../services');

const findAll = async (_req, res) => {
 const result = await salesService.findAll();

 if (result.type) {
  const error = result;
  return res.status(404).json(error);
 }

 return res.status(200).json(result);
};
const findById = async (req, res) => {
  const { id } = req.params;
 const result = await salesService.findById(id);
 console.log('result is:', result);

 if (result.type) {
  const error = result;
  return res.status(404).json(error);
 }

 return res.status(200).json(result);
};
const findByQuery = async (req, res) => {
  const { q } = req.query;
 const result = await salesService.findByQuery(q);

 if (result.type) {
  const error = result;
  return res.status(404).json(error);
 }

 return res.status(200).json(result);
};

const create = async (req, res) => {
  const data = req.body;

  const result = await salesService.create(data);

  if (result.type) {
    const error = result;
    return res.status(404).json({ message: error.message });
  }

  return res.status(201).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
 const result = await salesService.update(id);

 if (result.type) {
  const error = result;
  return res.status(404).json(error);
 }

 return res.status(200).json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;

 const result = await salesService.remove(id);
 console.log('result  controller is:', result);

 if (result.type) {
  const error = result;
  return res.status(404).json(error);
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
