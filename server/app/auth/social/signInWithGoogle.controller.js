const OAuth2Data = require("../../configs/clientSecret.json");

const CLIENT_ID = OAuth2Data;

const signinWithGoogle = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = signinWithGoogle;
