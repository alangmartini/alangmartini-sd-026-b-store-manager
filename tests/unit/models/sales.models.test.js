// Struct imports
const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinonChai = require("sinon-chai");

// Mocks and stubs
const { connection } = require("../../../src/models/connection");
const mock = require("./mocks/sales.model.mock");

// To test
const { salesModel } = require("../../../src/models");
const { ERRORS_TYPE, ERRORS_MESSAGE } = require("../../../src/errors");

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

describe("Tests for sales model", function () {
  afterEach(() => {
    sinon.restore();
  });

  // describe("findAll function", function () {
  //   it("Should return all sales", async function () {
  //     sinon.stub(connection, "execute").resolves([mock.findAllReturn]);

  //     const result = await salesModel.findAll();

  //     expect(result).to.equal(mock.findAllReturn);
  //   });
  // });

  describe("create function", function () {
    it("Should return correctly when sale with 1 product", async function () {
      sinon.stub(connection, "execute")
        .onCall(0).returns([22])
        .onCall(1).returns([{ insertId: 1 }])
        .onCall(2).returns([]);

      const result = await salesModel.create(mock.sales);

      expect(result).to.equal(1);
    });
    it("Should return correctly when sale with multiple products", async function () {
      sinon.stub(connection, "execute")
        .onCall(0).returns([22])
        .onCall(1).returns([{ insertId: 1 }])
        .onCall(2).returns([]);

      const result = await salesModel.createMultiple(mock.sales);
      

      expect(result).to.equal(1);
    });
    it("Should error when no id found: create single", async function () {
      sinon.stub(connection, "execute")
        .onCall(0).returns([])

      const ERROR_OBJECT = {
        type: ERRORS_TYPE.INVALID_ID,
        message: ERRORS_MESSAGE.INVALID_ID,
      };

      const result = await salesModel.create(mock.sales);
      expect(result).to.deep.equal(ERROR_OBJECT);
    });
    it("Should error when no id found: create single", async function () {
      sinon.stub(connection, "execute")
        .onCall(0).returns([])

      const ERROR_OBJECT = {
        type: ERRORS_TYPE.INVALID_ID,
        message: ERRORS_MESSAGE.INVALID_ID,
      };

      const result = await salesModel.createMultiple(mock.sales);
      expect(result).to.deep.equal(ERROR_OBJECT);
    });
  });
});
