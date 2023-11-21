const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../database/User");
// Please create an. env file in the root directory and use your own JWT private key
const privateKey = process.env.JWT_PRIVATE_KEY;
const saltRounds = 10;

//hash our password
router.use(function (req, res, next) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        req.hashedPassword = hash;
        next();
      });
    });
  });

//register
//using back-end tools like postman http://localhost:4000/auth/register
/*
{
    "username": "zhihong@gmail.com",
    "password": "123456",
    "passwordConfirmation": "123456"
}
*/
router.post("/register", async function (req, res, next){
  //Check the username and password transmitted from the front-end and confirm if the password is empty
  if(req.body.username && req.body.password && req.body.passwordConfirmation){
    //If not empty, check if the password matches twice
    if(req.body.password === req.body.passwordConfirmation){
      //If the password matches correctly, we use variables to store the username and password, and store them in the database
      const user = new User ({
        username: req.body.username,
        //Encrypt the password in our request body
        password: req.hashedPassword,
      });
      //save into database
      user
        .save()
        .then((savedUser) => {
          //On the backend, we can view the returned user ID and username
          //In MongoDB, each document's_ The id field is a special field used to uniquely identify the document。
          //By default, MongoDB uses the Object Id type of_ The id field is assigned a value of 12 bytes, 
          //usually represented as a 24 character hexadecimal string, such as "507f191e810c19729de860ea"
          return res.status(201).json({
            id: savedUser._id,
            username: savedUser.username,
          });
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    }
    //If the passwords do not match, an error request is returned
    else {
      return res.status(400).json({ error: "Passwords not matching" });
    }
  }
  //And if there is a field that defaults, it also returns an error code
  else {
    return res.status(400).json({ error: "Username or Password Missing" });
  }
});


//login
//using back-end tools like postman http://localhost:4000/auth/login
/*
{
    "username": "zhihong@gmail.com",
    "password": "123456",
}
*/
router.post("/login", async function (req, res, next) {
  //Check the username and password transmitted from the front-end, if there are any values
  if (req.body.username && req.body.password) {
    //We will search for this user in our existing user table
    const user = await User.findOne()
      .where("username")
      .equals(req.body.username)
      .exec();
    //If there is this user, we will decrypt the encrypted password stored in the user table
    if (user) {
      return bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          //If our passwords match, we will successfully log in and generate access_ Token
          if (result === true) {
            const token = jwt.sign({ id: user._id }, privateKey, {
              algorithm: "RS256",
            });
            return res.status(200).json({
              id: user._id, 
              username: user.username, 
              access_token: token 
            });
          //If the username and password are incorrect, return an error code
          } else {
            return res.status(401).json({ error: "Invalid credentials." });
          }
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    }
    //If there is no such user, we will also return an error code
    return res.status(401).json({ error: "Invalid credentials." });
    //Finally, if user is directly blank, it means that we have not filled in a place
  } else {
    res.status(400).json({ error: "Username or Password Missing" });
  }
});

module.exports = router;