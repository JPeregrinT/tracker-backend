const express = require("express");
const jwt = require ("jsonwebtoken");
const User = require("../models/User");
const UserSchema= require("../models/User")
const { sendWelcomeEmail } = require("../controllers/mail"); 
const jwtSecret = process.env.JWT_SECRET;

const authRouter = express.Router();

 authRouter.post("/register", async (req, res) => {
     const email = req.body.email;
     const data = req.body;
     console.log(req.body);
  // * Make sure request has the email
  if (!email) {
     return res.status(400).json({ error:  "Email not recieved"  });
   }
   const existingUser = await User.findOne({ email: email });
   // * If the user is found, return an error because there is already a user registered
   if (existingUser) {
    return res
      .status(400)
       .json({ error: "Email already registered"  });
   } else {
    const newUser = new User({
      email: data.email,
      password: data.password,
      name: data.name,
      surName: data.surName,
      userImage: data.userImage,
      gender: data.gender,
      birthdate: data.birthdate
     });
     const savedUser = await newUser.save();
     if (savedUser) {

      sendWelcomeEmail(savedUser.name, savedUser.email);

       return res.status(201).json({
         token: savedUser.generateJWT(),
        user: {
           email: savedUser.email,
           name: savedUser.name,
          id: savedUser._id,
         },
         
       });
     } else {
      return res.status(500).json({ error: "Error creating new User :(", message: err.message });
         
     }
  }
 });
 authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // * Validate, email and password were provided in the request
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Missing email or password"  });
  }
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(400)
        .json({ error: "User not found, please Register"  });
    }
    // * Validate password with bcrypt library
    if (!foundUser.comparePassword(password)) { 
      // if (foundUser.password !== password) {
      return res.status(400).json({ error:  "Invalid Password"  });
    }
    // * if everything is ok, return the new token and user data
    return res.status(200).json({
      token: foundUser.generateJWT(),
      user: {
        email: foundUser.email,
        name: foundUser.name,
        id: foundUser._id,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: "Error while logging in :(", error: err.message });
  }
});

 const jwtMiddleware = (req, res, next) => {
    // Recogemos el header "Authorization". Sabemos que viene en formato "Bearer XXXXX...",
    // así que nos quedamos solo con el token y obviamos "Bearer "
    const authHeader = req.headers["authorization"];
  
    if (!authHeader)
      return res.status(401).json({ error: "Unauthorized MISSING HEADER" });
    const token = authHeader.split(" ")[1];
    // Si no hubiera token, respondemos con un 401
    if (!token) return res.status(401).json({ error: "Unauthorized and missing token" });
  
    let tokenPayload;
  
    try {
      // Si la función verify() funciona, devolverá el payload del token
      tokenPayload = jwt.verify(token, jwtSecret);
    } catch (error) {
      // Si falla, será porque el token es inválido, por lo que devolvemo error 401
      return res.status(401).json({ error: "Unauthorized" });
    }
  console.log("tokenpayload es ", tokenPayload)
    // // Guardamos los datos del token dentro de req.jwtPayload, para que esté accesible en los próximos objetos req
    req.jwtPayload = tokenPayload;
    next();
  };

//GET User, muestra los datos para el perfil
authRouter.get ('/user/:userId?', async (req, res) =>{
  
  try {
      const getUser = await UserSchema.findById(req.params.userId).sort({createdAt: -1})
      console.log('getUser', getUser)
      res.status(200).json(getUser)
  } catch (error){
      res.status(500).json({message: 'Server Error'})
  }
})
//Modifica el perfil
authRouter.post('/profile/modify/:userId?', (req, res) => {
  const data = req.body;
  const updateFields = {};

  // Build the update object with the modified fields
  if (data.email) updateFields.email = data.email;
  if (data.password) updateFields.password = data.password;
  if (data.name) updateFields.name = data.name;
  if (data.surName) updateFields.surName = data.surName;
  if (data.gender) updateFields.gender = data.gender;
  if (data.birthdate) updateFields.birthdate = data.birthdate;
  if (data.phone) updateFields.phone = data.phone;
  if (data.city) updateFields.city = data.city;
  if (data.country) updateFields.country = data.country;
  if (data.address) updateFields.address = data.address;
  if (data.homeNumber) updateFields.homeNumber = data.homeNumber;
  if (data.postCode) updateFields.postCode = data.postCode;
  if (data.image) updateFields.userImage = data.image;

  User.findByIdAndUpdate(
    req.params.userId,
    { $set: updateFields },
    { new: true }
  )
    .then(updatedUser => {
      console.log('User updated: ', updatedUser);
      res.status(200).send('User update finished');
    })
    .catch(error => {
      res.status(400).json({ error: 'Error while updating the user.' });
    });
});

module.exports = {
    authRouter,
    jwtMiddleware,
}