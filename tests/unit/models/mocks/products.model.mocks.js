const findAllReturn = [
  {
    id: 1,
    name: 'Martelo do Thor'
  },
  {
    id: 2,
    name: 'Traje de Encolhimento',
  }
];

const product = {
  id: 1,
  name: 'Herois de brinquedo',
}

const wrongProductShort = {
  name: 'Her'
};

const wrongProductType = {
  name: 23412
};

const wrongProductEmpty = {
  name: ''
};

const wrongProductNone = {};

const insertIdObj = {
  insertId: 1,
}

module.exports = {
  findAllReturn,
  insertIdObj,
  product,
  wrongProductShort,
  wrongProductType,
  wrongProductEmpty,
  wrongProductNone,
};