import { resolve } from "path";
import dotenv from "dotenv";

dotenv.config({
  path: resolve(__dirname, "../../../.env"),
});

export const { DEVICE_ID } = process.env;
if (!DEVICE_ID) throw new Error("Missing Env Variable: 'DEVICE_ID'");

const { TEST_USER_ID } = process.env;
if (!TEST_USER_ID) throw new Error("Missing Env Variable: 'TEST_USER_ID'");

const { MODULE_ID } = process.env;
if (!MODULE_ID) throw new Error("Missing Env Variable: 'MODULE_ID'");

const { DB_SERVICE_HEADER } = process.env;
if (!DB_SERVICE_HEADER)
  throw new Error("Missing Env Variable: 'DB_SERVICE_HEADER'");

import fetch from "node-fetch";
const getTestUser = () =>
  fetch(`https://wpm.mezlaw.de/user/${TEST_USER_ID}/module/${MODULE_ID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: DB_SERVICE_HEADER,
    },
  })
    .then((res) => res.json())
    .then((res) => res.serviceRequest);

const { SERVICE_URL } = process.env;
const getServiceUrl = () =>
  SERVICE_URL || getTestUser().then((res) => res.serviceUrl + "/");

import defaultChai from "chai";
import chaiHttp from "chai-http";
defaultChai.use(chaiHttp);

export const getChai = async () => {
  const serviceUrl = await getServiceUrl();
  return defaultChai.request(serviceUrl);
};

export const chai = getChai();

export const getToken = () => getTestUser().then((res) => res.body.token);
