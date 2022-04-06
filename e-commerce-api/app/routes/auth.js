const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const CLIENT_URL = "http://localhost:3001/";

//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,

    //first parameter is password and second parameter is secret key from .env
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
    console.log(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    !user && res.status(401).json("Wronge Credentials!");

    //first parameter is password and second parameter is secret key from .env
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    //create jwt to verify user
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECTRET_KEY,
      //token expites in 3 days, required to login again
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

module.exports = router;
