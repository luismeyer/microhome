import { getChai, getToken } from "./config";

import { expect } from "chai";

const action = "list";

describe("List action", () => {
  describe("Body Checks", () => {
    context("Error response", () => {
      it("returns error if token is missing", function (done) {
        this.timeout(5000);
        getChai().then((chai) =>
          chai
            .post("")
            .send({ action })
            .then((res) => {
              expect(res).to.have.status(400);

              expect(res.body.success).to.be.false;
              expect(res.body.error).to.exist;
              done();
            })
        );
      });

      it("returns error if token is wrong", function (done) {
        this.timeout(5000);
        getChai().then((chai) =>
          chai
            .post("")
            .send({ action, token: "123" })
            .then((res) => {
              expect(res).to.have.status(400);

              expect(res.body.success).to.be.false;
              expect(res.body.error).to.exist;
              done();
            })
        );
      });
    });

    context("Success response", () => {
      it("returns success if token is set", function (done) {
        this.timeout(5000);
        getChai().then(async (chai) =>
          chai
            .post("")
            .send({ action, token: await getToken() })
            .then((res) => {
              expect(res).to.have.status(200);

              expect(res.body.success).to.be.true;
              expect(res.body.error).to.be.undefined;
              done();
            })
        );
      });
    });
  });

  describe("Correct result", () => {
    it("return list of devices", function (done) {
      this.timeout(5000);
      getChai().then(async (chai) =>
        chai
          .post("")
          .send({ action, token: await getToken() })
          .then((res) => {
            expect(res).to.have.status(200);

            expect(res.body.success).to.be.true;
            expect(res.body.error).to.be.undefined;

            expect(res.body.result).to.exist;
            expect(res.body.result).to.be.an("array");
            done();
          })
      );
    });
  });
});
