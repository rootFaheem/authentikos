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
      return res.status(200).json({
        success: true,
        url
      });
    }

    const gmail = google.gmail({ version: "v1", auth: "oAuth2Client" });

    gmail.users.labels.list(
      {
        userId: "me"
      },
      (err, res) => {
        if (err) return console.log("API returned an error", err);

        const labels = res.data.labels;

        if (labels.length) {
          console.log("Labels: ");
          labels.forEach(label => {
            console.log(`- ${label.name}`);
          });
        } else {
          console.log("No label found");
        }
      }
    );

    res.send("logged in");
  } catch (err) {
    next(err);
  }
};

const googleAuthCallback = async (req, res) => {
  const code = req.query.code;
  try {
    if (code) {
      oAuth2Client.getToken(code, (err, tokens) => {
        if (err) {
          console.log("Error Authenticating:", err);
        }

        console.log("Successfully Authenticated");
        oAuth2Client.setCredentials(tokens);
        authed = true;
        res.status(200).json({
          success: true,
          authed
        });
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = signinWithGoogle;
