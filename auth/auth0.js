const { auth } = require("express-openid-connect");
require("dotenv").config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  authorizationParams: {
    response_mode: "form_post", // Set the response mode if required
  },
};

module.exports = auth(config);
