import express from "express";
import cors from "cors";
import "express-async-errors";

import db from "./db/conn.mjs";

import post from "./app/routes/post.mjs";
import auth from "./app/routes/auth.mjs";
import role from "./app/routes/role.mjs";
import user from "./app/routes/user.mjs";
import session from "express-session";

import "dotenv/config";

import authJwt from "./app/middleware/authJwt.mjs";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5050;
const connectionString = process.env.ATLAS_URI || "";

const app = express();

/*
app.use(
  session({
    cookieName: "token",
    secret: "notagoodsecretnoreallydontusethisone",
    resave: false,
    saveUninitialized: true,
    httpOnly: true, // dont let browser javascript access cookie ever
    secure: true, // only use cookie over https
    ephemeral: true, // delete this cookie while browser close
  })
);*/
app.use(cookieParser());

app.use(cors({
  origin:'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

app.use("/posts", authJwt.verifyToken, post);
app.use("/auth/", auth);
app.use("/role/", authJwt.verifyToken,role);
app.use("/user/", authJwt.verifyToken,user);

// Global error handling
app.use((err, _req, res, next) => {
  console.log('INTERNAL ERROR: ')
  console.log(err)

  res.status(500).send("Uh oh! An unexpected error occured.");
});

db.mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.send("Welcome to SAFFI API application." );
});
// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
