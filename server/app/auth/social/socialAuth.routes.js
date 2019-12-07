const Router = require("express").Router();

const signinWithGoogleController = require("./signInWithGoogle.controller");

Router.post("/signin-with-google", signinWithGoogleController);

module.exports = Router;
