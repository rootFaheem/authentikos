const Router = require("express").Router();

const { signInWithGoogle } = require("./signInWithGoogle.controller");

Router.post("/signin-with-google", signInWithGoogle);

module.exports = Router;
