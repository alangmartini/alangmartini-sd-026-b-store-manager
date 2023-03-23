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

const updatedSale = {
  saleId: "1",
  itemsUpdated: [
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

const showAllSales = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

const showSaleById = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];
module.exports = {
  sales,
  singleSale,
  cadastratedSale,
  updatedSale,
  showAllSales,
  showSaleById,
};