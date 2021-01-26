import fetch from "node-fetch";
import { DB_AUTH_PASSWORD, DB_AUTH_USER } from "./const";

const token = Buffer.from(`${DB_AUTH_USER}:${DB_AUTH_PASSWORD}`);

const HEADERS = {
  "Content-type": "application/json",
  Authorization: `Basic ${token.toString("base64")}`,
};

const baseFetch = (url: string, method: string, body?: string) =>
  fetch(url, {
    method,
    headers: HEADERS,
    body,
  });

export const sendPost = (url: string, json?: string) =>
  baseFetch(url, "post", json);

export const sendPut = (url: string, json?: string) =>
  baseFetch(url, "put", json);

export const sendGet = (url: string) => baseFetch(url, "get");

export const sendDelete = (url: string) => baseFetch(url, "delete");
