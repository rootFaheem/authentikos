const OAuth2Data = require("../../../configs/clientSecret.json");

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;

const signinWithGoogle = async (req, res, next) => {
  try {
    console.log(CLIENT_ID);
    console.log(CLIENT_SECRET);
    console.log(REDIRECT_URL);
  } catch (err) {
    next(err);
  }
};

module.exports = signinWithGoogle;
