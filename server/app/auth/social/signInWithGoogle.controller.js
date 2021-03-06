const { google } = require("googleapis");
const express = require("express");
const OAuth2Data = require("../../../configs/clientSecret.json");

const app = express();

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
var authed = false;

// app.get("/", (req, res) => {

const signInWithGoogle = (req, res) => {
  console.log("Social Signin hit");

  if (!authed) {
    // Generate an OAuth URL and redirect there
    oAuth2Client.redirectUri = ["http://localhost:8079/auth/google/callback"];
    const url = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: "https://www.googleapis.com/auth/gmail.readonly"
    });
    console.log("Auth URL: ", url);

    res.redirect(url);
  } else {
    const resData = "";
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
    gmail.users.labels.list(
      {
        userId: "me"
      },
      (err, res) => {
        if (err) return console.log("The API returned an error: " + err);

        const labels = res.data.labels;
        if (labels.length) {
          console.log("Labels:");
          labels.forEach(label => {
            console.log(`- ${label.name}`);
          });
        } else {
          console.log("No labels found.");
        }

        resData = res;
      }
    );

    console.log("resData: ", resData);
    // res.send("Logged in", resData);
    res.status(200).json({
      resData
    });
  }
};

const googleCallback = (req, res) => {
  const code = req.query.code;
  if (code) {
    // Get an access token based on our OAuth code
    oAuth2Client.getToken(code, function(err, tokens) {
      if (err) {
        console.log("Error authenticating");
        console.log(err);
      } else {
        console.log("Successfully authenticated");
        oAuth2Client.setCredentials(tokens);
        authed = true;
        // res.redirect("/");

        return res.status(200).json({
          sucess: true,
          authed,
          oAuth2Client
        });
      }
    });
  }
};

// const port = process.env.port || 5000;
// app.listen(port, () => console.log(`Server running at ${port}`));

module.exports = {
  signInWithGoogle,
  googleCallback
};
