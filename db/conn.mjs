import mongoose from "mongoose";
import User from "../app/models/user.model.mjs";
import Role from "../app/models/role.model.mjs";
import Post from "../app/models/post.model.mjs";
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User;
db.role = Role;
db.post = Post;

 

db.ROLES = ["user", "admin", "moderator"];

export default db;