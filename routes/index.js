const express = require("express");
const generalRouter = express.Router();
const loginRoutes = require("./login");
const { jwtMiddleware, authRouter } = require("../security/jwt");
const User = require("../models/User");

//Router principal
generalRouter.use("/", authRouter);

// Redirigir a middlewares de jwt
generalRouter.use("/login", jwtMiddleware, loginRoutes);

//Update profile
// generalRouter.get('/profile/modify/:userId?', (req, res) => {
//     User.findByIdAndUpdate(
//     req.params.userId,
//     {
//         $set: { email: email, password: password }
//     },
//     {
//         new: true
//     }
//     )
//         .then(updatedUser => console.log('User updated: ', updatedUser))
//         .catch(err => console.log('Error while updating the student: ', err));
//     res.status(200).send('ok')

//     })

module.exports = generalRouter;