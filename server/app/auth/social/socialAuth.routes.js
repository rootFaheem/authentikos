const Router = require("express").Router();

const { signInWithGoogle } = require("./signInWithGoogle.controller");

Router.post("/signin-with-google", signInWithGoogle);
Router.get("/", signInWithGoogle);

module.exports = Router;
