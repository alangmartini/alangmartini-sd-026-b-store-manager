// Struct imports
const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinonChai = require("sinon-chai");

// Mocks and stubs
const { productsService } = require("../../../src/services");
const { findAllReturn } = require("../models/mocks/products.model.mocks");

// To test
const { ERRORS_MESSAGE, ERRORS_TYPE } = require("../../../src/errors");
const app = require("../../../src/app");
const { connection } = require("../../../src/models/connection");

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

describe("Tests for products integration", function () {
  afterEach(() => {
    sinon.restore();
  });

  describe("Get all products", function () {
    it("Should return all products", async function () {
      sinon.stub(connection, "execute").resolves([findAllReturn]);

      const answer = await chai
        .request(app)
        .get('/products/');

      expect(answer.body).to.deep.equal(findAllReturn);
      expect(answer.status).to.equal(200);
    });

    it("Should return a error", async function () {
      sinon.stub(connection, "execute").resolves([]);
      const ERROR_OBJECT = {
        type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
        message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
      };

      const answer = await chai.request(app).get("/products");

      expect(answer.body).to.deep.equal({ message: ERROR_OBJECT.message });
      expect(answer.status).to.equal(404);
    });
  });

  describe("Get one product by id", function () {
    it("Should return exactly one product", async function () {
      sinon.stub(connection, "execute").resolves([[findAllReturn[0]]]);

      const answer = await chai.request(app).get("/products/1");
      
      expect(answer.body).to.deep.equal(findAllReturn[0]);
      expect(answer.body.id).to.deep.equal(1);
      expect(answer.status).to.equal(200);
    });

    it("Should return a error", async function () {
      sinon.stub(connection, "execute").resolves([[]]);
      const ERROR_OBJECT = {
        type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
        message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
      };

      const answer = await chai.request(app).get("/products/1");

      expect(answer.body).to.deep.equal({ message: ERROR_OBJECT.message });
      expect(answer.status).to.equal(404);
    });
  });
});
