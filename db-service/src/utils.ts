export const { IS_OFFLINE, AUTH_USER, AUTH_PASSWORD } = process.env;

if (!AUTH_USER) {
  throw new Error("Missing Env Variable: 'AUTH_USER'");
}

if (!AUTH_PASSWORD) {
  throw new Error("Missing Env Variable: 'AUTH_PASSWORD'");
}
