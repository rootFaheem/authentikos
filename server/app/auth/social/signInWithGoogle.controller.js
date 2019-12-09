const { google } = require("googleapis");

const OAuth2Data = require("../../../configs/clientSecret.json");

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
const authed = false;

const signinWithGoogle = async (req, res, next) => {
  console.log(CLIENT_ID);
  console.log(CLIENT_SECRET);
  console.log(REDIRECT_URL);
  try {
    if (!authed) {
      const url = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: "https://www.googleapis.com/auth/gmail.readonly"
      });

      console.log(url);
      res.status(200).json({
        success: true,
        url
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = signinWithGoogle;
