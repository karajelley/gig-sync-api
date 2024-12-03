const { expressjwt: jwt } = require("express-jwt");

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET, // Ensure this matches the secret used to sign the token
  algorithms: ["HS256"], // HS256 is default; use this unless your JWTs were signed with another algorithm
  requestProperty: "payload", // Decoded token will be accessible via req.payload
  getToken: getTokenFromHeaders,
});

function getTokenFromHeaders(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

module.exports = {
  isAuthenticated,
};
