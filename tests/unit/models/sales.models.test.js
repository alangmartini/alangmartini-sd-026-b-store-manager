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
    it("Should return correctly when only 1 sale", async function () {
      sinon.stub(connection, "execute")
        .onCall(0).returns([{ algo: 'algo' }]);

      const result = await salesModel.create(mock.sales);

      expect(result).to.equal(mock.insertIdObj.insertId);
    });
  });
});
