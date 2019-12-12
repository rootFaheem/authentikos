const Router = require("express").Router();

const {
  signInWithGoogle,
  googleCallback
} = require("./signInWithGoogle.controller");

Router.post("/signin-with-google", signInWithGoogle);
Router.get("/callback", googleCallback);

module.exports = Router;
