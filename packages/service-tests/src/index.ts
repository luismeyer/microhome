import { getChai } from "./config";
import { expect } from "chai";

describe("Index action", () => {
  describe("Body Checks", () => {
    it("returns error if body is missing", function (done) {
      this.timeout(5000);
      getChai().then((chai) =>
        chai.get("").then((res) => {
          expect(res).to.have.status(400);

          expect(res.body.success).to.be.false;
          expect(res.body.error).to.exist;
        })
      );

      getChai().then((chai) =>
        chai.post("").then((res) => {
          expect(res).to.have.status(400);

          expect(res.body.success).to.be.false;
          expect(res.body.error).to.exist;
        })
      );

      done();
    });
  });
});
