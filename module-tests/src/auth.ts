import { getChai } from "./config";

import { expect } from "chai";

const action = "auth";

describe("Auth action", () => {
  describe("Body Checks", () => {
    context("Success response", () => {
      it("returns auth string", function (done) {
        this.timeout(5000);
        getChai().then((chai) =>
          chai
            .post("")
            .send({ action, data: "1234" })
            .then((res) => {
              expect(res).to.have.status(200);

              expect(res.body.success).to.be.true;
              expect(res.body.error).to.be.undefined;
              expect(res.body.result).to.exist;
              expect(res.body.result).to.be.a("string");
              done();
            })
        );
      });
    });
  });
});
