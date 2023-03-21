// Struct imports
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

// Mocks and stubs
const { connection } = require('../../../src/models/connection');
const mock = require('./mocks/products.model.mocks');

// To test
const { productsModel } = require('../../../src/models');

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

describe('Tests for products model', function() {
  afterEach(() => {
    sinon.restore()
  });
  
  describe('findAll function', function () {
    it('Should return all products', async function () {
      sinon.stub(connection, 'execute').resolves([mock.findAllReturn]);

      const result = await productsModel.findAll();

      expect(result).to.equal(mock.findAllReturn);
    });
  });
  describe('create function', function () {
    it('Should return inserted product id', async function () {
      sinon.stub(connection, 'execute').resolves([mock.insertIdObj]);

      const result = await productsModel.create(mock.product);

      expect(result).to.equal(mock.insertIdObj.insertId);
    });
  });
})