import { expect } from "chai";

import { getChai, getToken, DEVICE_ID } from "./config";

describe("Switch action", () => {
  describe("On action", () => {
    const action = "on";

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

        it("returns error if deviceId is missing", function (done) {
          this.timeout(5000);
          getChai().then(async (chai) =>
            chai
              .post("")
              .send({ action, token: await getToken() })
              .then((res) => {
                expect(res).to.have.status(400);

                expect(res.body.success).to.be.false;
                expect(res.body.error).to.exist;
                done();
              })
          );
        });

        it("returns error if deviceId is wrong", function (done) {
          this.timeout(5000);
          getChai().then(async (chai) =>
            chai
              .post("")
              .send({ action, token: await getToken(), deviceId: "123" })
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
        it("returns success if token and deviceId is set", function (done) {
          this.timeout(5000);
          getChai().then(async (chai) =>
            chai
              .post("")
              .send({
                action,
                token: await getToken(),
                deviceId: DEVICE_ID,
              })
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
  });

  describe("Off action", () => {
    const action = "off";

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

        it("returns error if deviceId is missing", function (done) {
          this.timeout(5000);
          getChai().then(async (chai) =>
            chai
              .post("")
              .send({ action, token: await getToken() })
              .then((res) => {
                expect(res).to.have.status(400);

                expect(res.body.success).to.be.false;
                expect(res.body.error).to.exist;
                done();
              })
          );
        });

        it("returns error if deviceId is wrong", function (done) {
          this.timeout(5000);
          getChai().then(async (chai) =>
            chai
              .post("")
              .send({ action, token: await getToken(), deviceId: "123" })
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
        it("returns success if token and deviceId is set", function (done) {
          this.timeout(5000);
          getChai().then(async (chai) =>
            chai
              .post("")
              .send({
                action,
                token: await getToken(),
                deviceId: DEVICE_ID,
              })
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
  });
});
