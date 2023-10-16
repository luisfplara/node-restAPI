import db from "../../db/conn.mjs";
import "dotenv/config";
const User = db.user;
const Role = db.role;

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const jwtSecret = process.env.JWT_ACCESS_TOKEN_SECRET || "";

let refreshTokens = [];

async function signup(req, res) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  try {
    let result = await user.save();
    res.send(result).status(204);
  } catch (err) {

  }
}

function signin(req, res) {
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      const token = generateAccessToken({ id: user.id });
      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_TOKEN_SECRET,
       {expiresIn: "24h"},
      );

      refreshTokens.push(refreshToken);

      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      res.cookie("r_tkn", refreshToken, { maxAge: 900000, httpOnly: true });
      res.status(200).send({
        id: user._id,
        name:user.name,
        email: user.email,
        access_token: token,
        refresh_token: refreshToken,
      });
    })
    .catch((err) => {
      if (err) {
    
        res.status(500).send({ message: err });
        return;
      }
    });
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
}

function signout(req, res) {

  refreshTokens = refreshTokens.filter((token) => token !== req.cookies.r_tkn);
  res.cookie("r_tkn", 'none', { expires: new Date(Date.now() + 5 * 1000), httpOnly: true });
  return res.status(204).send({ message: "You've been signed out!" });
}

function refreshToken(req, res) {
  let refreshToken;
  const authHeader = req.headers["authorization"];

  if (req.cookies.r_tkn) {
    refreshToken = req.cookies.r_tkn;
  }


  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({ name: user.name });
      res.json({ access_token: accessToken });
    }
  );
}

const auth = {
  signin,
  signout,
  signup,
  refreshToken,
};

export default auth;
