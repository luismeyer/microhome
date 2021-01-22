const { IS_OFFLINE } = process.env;
if (IS_OFFLINE) {
  throw new Error("Missing Env Variable: 'IS_OFFLINE'");
}
