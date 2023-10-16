import db from "../../db/conn.mjs";
import { ObjectId } from "mongodb";

const User = db.user;

async function getAll(req, res) {
  let results = await User.find().populate('roles').limit(50);
  res.send(results).status(200);

}

async function getSingle(req, res) {
  let query = { _id: ObjectId(req.params.id) };
  console.log('query')
  console.log(query)
  let result = await User.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
}

async function deleteOne(req, res) {
  const query = { _id: ObjectId(req.params.id) };

  let result = await User.deleteOne(query);

  res.send(result).status(200);
}

const user = {

  getSingle,
  getAll,

  deleteOne,
};

export default user;
