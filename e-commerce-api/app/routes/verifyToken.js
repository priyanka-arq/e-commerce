const jwt = require("jsonwebtoken");

//verify user token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    //function to verify token, returns err or user
    //const token = req.headers.token;
    const token = authHeader.split(" ")[1];
    //user comes from token credentials(is, isAdmin) that used in login router for creating access token
    jwt.verify(token, process.env.JWT_SECTRET_KEY, (err, user) => {
      if (err) res.status(403).json("Token is not valid");
      //user includes #id and isAdmin
      req.user = user;
      next();
    });
  } else {
    //if no accessToken in header
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    //req.user coming from verifyToken function
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allow for requested use!");
    }
  });
};

//verify admin to update orders and products
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    //req.user coming from verifyToken function
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allow for requested use!");
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
