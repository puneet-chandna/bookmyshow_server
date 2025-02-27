const {userModel} = require('../models/users');
const jwt = require("jsonwebtoken");
const authenticationMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  const userAuth =
  {
    email: email,
    password: password
  }

  if (!userAuth) {
    throw new UnauthenticatedError('No info provided');
  }

  try {
    const obj = await userModel.findOne({email});
    console.log(obj);
    req.user = obj;
    // console.log(req);
    // res.status(200).send(obj)
    next();
  }
  catch (err) {
    res.status(404).send("User not found, Please enter valid details or sign up first");
  }
}

module.exports = authenticationMiddleware;
