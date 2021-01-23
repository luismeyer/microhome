export const { IS_OFFLINE, DB_AUTH_USER, DB_AUTH_PASSWORD } = process.env;

if (!DB_AUTH_USER) {
  throw new Error("Missing Env Variable: 'DB_AUTH_USER'");
}

if (!DB_AUTH_PASSWORD) {
  throw new Error("Missing Env Variable: 'DB_AUTH_PASSWORD'");
}
