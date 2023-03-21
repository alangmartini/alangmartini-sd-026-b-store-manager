// Struct imports
const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinonChai = require("sinon-chai");

// Mocks and stubs
const { productsService } = require("../../../src/services");
const mock = require("../models/mocks/products.model.mocks");

// To test
const { productsController } = require("../../../src/controllers");
const { ERRORS_MESSAGE, ERRORS_TYPE } = require("../../../src/errors");
const { productsModel } = require("../../../src/models");

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

describe("Tests for products controller", function () {
  afterEach(() => {
    sinon.restore();
  });

  describe("findAll function", function () {
    it("Should return all products", async function () {
      const req = {};
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(productsService, "findAll").resolves(mock.findAllReturn);
      
      await productsController.findAll(req, res);
      
      expect(res.json).to.have.been.calledWith(mock.findAllReturn);
      expect(res.status).to.have.been.calledWith(200);
    });

    it("Should return a error", async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      const ERROR_OBJECT = {
        type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
        message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
      };

      sinon.stub(productsService, "findAll").resolves(ERROR_OBJECT);

      await productsController.findAll(req, res);

      expect(res.json).to.have.been.calledWith({ message: ERROR_OBJECT.message });
      expect(res.status).to.have.been.calledWith(404)
    });
  });

  describe("findById function", function () {
    it("Should return a single item with appropriate id", async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(productsService, "findById").resolves(mock.findAllReturn[0]);
      
      await productsController.findById(req, res);
      
      expect(res.json).to.have.been.calledWith(mock.findAllReturn[0]);
      expect(res.status).to.have.been.calledWith(200);
    });

    it("Should return a error", async function () {
      const req = {
        params: {
          id: 1
        }
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      const ERROR_OBJECT = {
        type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
        message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
      };

      sinon.stub(productsService, "findById").resolves(ERROR_OBJECT);

      await productsController.findById(req, res);

      expect(res.json).to.have.been.calledWith({ message: ERROR_OBJECT.message });
      expect(res.status).to.have.been.calledWith(404)
    });
  });

  describe("create function", function () {
    it("Should the object that was inserted, id included", async function () {
      const req = {
        body: mock.product
      };
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      const id = mock.insertIdObj.insertId;

      sinon.stub(productsService, "create").resolves(id);
      
      await productsController.create(req, res);
      
      expect(res.json).to.have.been.calledWith({ id, name: mock.product.name });
      expect(res.status).to.have.been.calledWith(201);
    });

    it("Should return a error", async function () {
      const req = {
        params: {
          id: 1
        }
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      const ERROR_OBJECT = {
        type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
        message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
      };

      sinon.stub(productsService, "create").resolves(ERROR_OBJECT);

      await productsController.create(req, res);

      expect(res.json).to.have.been.calledWith({ message: ERROR_OBJECT.message });
      expect(res.status).to.have.been.calledWith(404)
    });
  });
});
