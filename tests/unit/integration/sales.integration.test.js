// Struct imports
const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinonChai = require("sinon-chai");

// Mocks and stubs
const { salesService } = require("../../../src/services");
const mock = require("../models/mocks/sales.model.mock");

// To test
const { ERRORS_MESSAGE, ERRORS_TYPE } = require("../../../src/errors");
const app = require("../../../src/app");
const { connection } = require("../../../src/models/connection");
const {
  NAME_MESSAGES,
} = require("../../../src/middlewares/validations/sales.schema");
const snakeize = require("snakeize");

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

describe("Tests for sales integration", function () {
  afterEach(() => {
    sinon.restore();
  });

  describe("Get all sales", function () {
    it("Should return all sales", async function () {
      sinon.stub(connection, "execute").resolves([snakeize(mock.showAllSales)]);

      const answer = await chai.request(app).get("/sales");

      expect(answer.body).to.deep.equal(mock.showAllSales);
      expect(answer.status).to.equal(200);
    });
  });

  describe("Get one product by id", function () {
    it("Should return exactly one product", async function () {
      sinon.stub(connection, "execute").resolves([snakeize(mock.showSaleById)]);

      const answer = await chai.request(app).get("/sales/1");

      expect(answer.body).to.deep.equal(mock.showSaleById);
      expect(answer.status).to.equal(200);
    });
  });

  describe("Update a new product", function () {
    it("Should return updated product object", async function () {
      sinon.stub(connection, "execute")
        .onCall(0).resolves([ 'mocked return so it pass validation'])
        .onCall(1).resolves([ 'mocked return so it pass validation'])
        .onCall(2).resolves([ 'mocked return so it pass validation'])

      const answer = await chai
        .request(app)
        .put("/sales/1")
        .send(mock.sales);

      expect(answer.body).to.deep.equal(mock.updatedSale);
      expect(answer.status).to.equal(200);
    });
  });

  describe("Delete a product", function () {
    it("Should return status code 204", async function () {
      sinon.stub(connection, "execute")
        .onCall(0).resolves([ 'mocked return so it pass validation'])
        

      const answer = await chai
        .request(app)
        .delete("/sales/1")

      expect(answer.status).to.equal(204);
    });
  });
})
