import jwt from "jsonwebtoken";
import "dotenv/config";
/*
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;
*/

const jwtSecret = process.env.JWT_ACCESS_TOKEN_SECRET || "";

function verifyToken(req, res, next) {
  let token;
  const authHeader = req.headers["authorization"];



  if (req.cookies.r_tkn) {
    token = req.cookies.r_tkn;
  }
  if (authHeader) {
    token = authHeader && authHeader.split(" ")[1];
  }



  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: "Unauthorized!",
      });
    }
    req.body.userId = decoded.id;

    next();
  });
}

const authJwt = {
  verifyToken,
  // isAdmin,
};
export default authJwt;
