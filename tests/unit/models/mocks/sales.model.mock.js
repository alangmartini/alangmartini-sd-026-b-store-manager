const sales = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];
const singleSale = [
  {
    productId: 1,
    quantity: 1,
  },
];

const cadastratedSale = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

module.exports = {
  sales,
  singleSale,
  cadastratedSale,
};