import db from "../../db/conn.mjs";
import { ObjectId } from "mongodb";
const Post = db.post;

async function getAll(req, res) {

  let results = await Post.find().limit(50);
  res.send(results).status(200);
}

async function getLastest(req, res) {
  let results = await Post.aggregate([
    { $project: { author: 1, title: 1, tags: 1, date: 1 } },
    { $sort: { date: -1 } },
    { $limit: 3 },
  ]);

  res.send(results).status(200);
}

async function getSingle(req, res) {
  let query = { _id: ObjectId(req.params.id) };
  let result = await Post.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
}

async function insertOne(req, res) {
  let newDocument = req.body;
  newDocument.date = new Date();

  try {
    let result = await Post.create(newDocument);

    res.send(result).status(204);
  } catch (err) {

  }


}

async function addComment(req, res) {
  const query = { _id: ObjectId(req.params.id) };
  const updates = {
    $push: { comments: req.body },
  };

  let result = await Post.updateOne(query, updates);

  res.send(result).status(200);
}

async function deleteOne(req, res) {
  const query = { _id: ObjectId(req.params.id) };

  let result = await Post.deleteOne(query);

  res.send(result).status(200);
}

const post = {
  getLastest,
  getSingle,
  getAll,
  insertOne,
  addComment,
  deleteOne,
};

export default post;
