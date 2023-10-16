import db from "../../db/conn.mjs";
import { ObjectId } from "mongodb";
const User = db.user;
const Role = db.role;

async function getAll(req, res) {

  let results = await Role.find().limit(50);
  res.send(results).status(200);
}

async function getSingle(req, res) {
  let query = { _id: ObjectId(req.params.id) };
  let result = await Role.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
}

async function insertOne(req, res) {
  let newDocument = req.body;
  newDocument.date = new Date();

  try {
    let result = await Role.create(newDocument);
 
    res.send(result).status(204);
  } catch (err) {
    console.log("err");
    console.log(err);
  }
}

async function deleteOne(req, res) {
  const query = { _id: ObjectId(req.params.id) };

  let result = await Role.deleteOne(query);

  res.send(result).status(200);
}

async function addRoleToUser(req, res) {
  let userId = req.body.user_id;
  let roleName = req.body.role;
  let resultRole = await Role.findOne({ name: roleName });

  if (!resultRole) {
    res.send("Role not found").status(404);
  } else {
    let resultUser = await User.findOne({ _id: userId });
    if (!resultUser) {
      res.send("User not found").status(404);
    } else {
      const updates = {
        $push: { roles: resultRole },
      };
      try {
        resultUser = await User.updateOne(resultUser, updates);
        res.status(200).send('Role added successful');
      } catch (err) {
        res.status(500).send('Role added successful');
      }
    }
  }
}

const role = {
  getAll,
  getSingle,

  insertOne,
  deleteOne,

  addRoleToUser,
};

export default role;
