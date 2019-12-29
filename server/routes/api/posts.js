const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post

router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
});



const uri = "mongodb+srv://andrey_1:kek123@cluster0-wsoju.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
// async function loadPostsCollection() {
//   const client = await mongodb.MongoClient(uri, { useNewUrlParser: true });
// }
async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

  return client.db("vue_express").collection("posts");
}
module.exports = router;
