const express = require("express");
const generalRouter = express.Router();
const loginRoutes = require("./login");
const { jwtMiddleware, authRouter } = require("../security/jwt");
const User = require("../models/User");

//Router principal
generalRouter.use("/", authRouter);

// Redirigir a middlewares de jwt
generalRouter.use("/login", jwtMiddleware, loginRoutes);
// generalRouter.use("/me", jwtMiddleware, loginRoutes);
module.exports = generalRouter;