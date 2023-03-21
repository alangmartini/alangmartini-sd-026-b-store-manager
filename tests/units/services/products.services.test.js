// Struct imports
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

// Mocks and stubs
const { productsModel } = require('../../../src/models');
const { findAllReturn } = require('../models/mocks/products.model.mocks');

// To test
const { productsService } = require('../../../src/services');
const { ERRORS_MESSAGE, ERRORS_TYPE } = require('../../../src/errors');

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

describe('Tests for products services', function() {
  afterEach(() => {
    sinon.restore()
  });

  describe('findAll function', function () {
    it('Should return all products', async function () {
      sinon.stub(productsModel, 'findAll').resolves(findAllReturn);

      const result = await productsService.findAll();

      expect(result).to.deep.equal(findAllReturn);
    });

    it('Should return a error', async function () {
      const ERROR_OBJECT = {
        type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
        message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
      };

      sinon.stub(productsModel, 'findAll').resolves();

      const result = await productsService.findAll();
      console.log(result);
      console.log(ERROR_OBJECT);
      expect(result).to.deep.equal(ERROR_OBJECT);
    })
  });
})