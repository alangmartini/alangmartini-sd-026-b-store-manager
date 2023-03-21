// Struct imports
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

// Mocks and stubs
const { connection } = require('../../../src/models/connection');
const { findAllReturn } = require('./mocks/products.model.mocks');

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
      sinon.stub(connection, 'execute').resolves([findAllReturn]);

      const result = await productsModel.findAll();

      expect(result).to.equal(findAllReturn);
    });
  });
})