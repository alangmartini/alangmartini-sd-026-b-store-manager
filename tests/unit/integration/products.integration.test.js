// Struct imports
const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinonChai = require("sinon-chai");

// Mocks and stubs
const { productsService } = require("../../../src/services");
const mock = require("../models/mocks/products.model.mocks");

// To test
const { ERRORS_MESSAGE, ERRORS_TYPE } = require("../../../src/errors");
const app = require("../../../src/app");
const { connection } = require("../../../src/models/connection");
const { NAME_MESSAGES } = require("../../../src/middlewares/validations/products.schema");

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

describe("Tests for products integration", function () {
  afterEach(() => {
    sinon.restore();
  });

  describe("Get all products", function () {
    it("Should return all products", async function () {
      sinon.stub(connection, "execute").resolves([mock.findAllReturn]);

      const answer = await chai
        .request(app)
        .get('/products/');

      expect(answer.body).to.deep.equal(mock.findAllReturn);
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
      sinon.stub(connection, "execute").resolves([[mock.findAllReturn[0]]]);

      const answer = await chai.request(app).get("/products/1");
      
      expect(answer.body).to.deep.equal(mock.findAllReturn[0]);
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

  describe("Create a new product", function () {
    it("Should return created product object", async function () {
      sinon.stub(connection, "execute").resolves([mock.insertIdObj]);

      const answer = await chai
        .request(app)
        .post("/products")
        .send({ name: mock.product.name });
      
      expect(answer.body).to.deep.equal(mock.product);
      expect(answer.body.id).to.deep.equal(1);
      expect(answer.status).to.equal(201);
    });

    it("Should return a error", async function () {
      sinon.stub(connection, "execute").resolves([{}]);
      const ERROR_OBJECT = {
        type: ERRORS_TYPE.PRODUCT_NOT_FOUND,
        message: ERRORS_MESSAGE.PRODUCT_NOT_FOUND,
      };

      const answer = await chai
        .request(app)
        .post("/products")
        .send({ name: mock.product.name  });

      expect(answer.body).to.deep.equal({ message: ERROR_OBJECT.message });
      expect(answer.status).to.equal(404);
    });
    it("Should return a error: wrong type", async function () {
      sinon.stub(connection, "execute").resolves([mock.insertIdObj]);
  
      const answer = await chai
        .request(app)
        .post("/products")
        .send({ name: mock.wrongProductType });

      expect(answer.body).to.deep.equal({ message: NAME_MESSAGES["string.base"] });
      expect(answer.status).to.equal(400);
    });
    it("Should return a error: too short", async function () {
      sinon.stub(connection, "execute").resolves([mock.insertIdObj]);
  
      const answer = await chai
        .request(app)
        .post("/products")
        .send({ name: mock.wrongProductShort });

      expect(answer.body).to.deep.equal({ message: NAME_MESSAGES["string.base"] });
      expect(answer.status).to.equal(400);
    });
    it("Should return a error: empty string", async function () {
      sinon.stub(connection, "execute").resolves([mock.insertIdObj]);

      const answer = await chai
        .request(app)
        .post("/products")
        .send({ name: '' });

      expect(answer.body).to.deep.equal({
        message: NAME_MESSAGES["string.empty"],
      });
      expect(answer.status).to.equal(400);
    });
    it("Should return a error: no name value", async function () {
      sinon.stub(connection, "execute").resolves([mock.insertIdObj]);

      const answer = await chai
        .request(app)
        .post("/products")
        .send({ });

      expect(answer.body).to.deep.equal({
        message: NAME_MESSAGES["any.required"],
      });
      expect(answer.status).to.equal(400);
    });
  });
});
