export const { DB_AUTH_PASSWORD, DB_AUTH_USER, DB_SERVICE_URL } = process.env;

if (!DB_AUTH_PASSWORD) {
  throw new Error("Missing Env Variable: 'DB_AUTH_PASSWORD'");
}

if (!DB_AUTH_USER) {
  throw new Error("Missing Env Variable: 'DB_AUTH_USER'");
}

if (!DB_SERVICE_URL) {
  throw new Error("Missing Env Variable: 'DB_SERVICE_URL'");
}
