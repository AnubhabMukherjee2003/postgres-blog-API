require('dotenv').config();
const express = require("express");
const cors = require("cors");

const { getAllPosts, getPostById } = require("./controller/pubOne");
const { createPost, updatePost, deletePost , getAllPostsAdmin} = require("./controller/cmsOne");
const {signUp, login} = require("./controller/auth");
const {verify} = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/posts", getAllPosts); // only published posts
app.get("/api/posts/all",verify,  getAllPostsAdmin); // all posts for admin

app.get("/api/posts/:id", getPostById);

app.post("/api/posts",verify, createPost)
app.put("/api/posts/:id",verify, updatePost);
app.delete("/api/posts/:id",verify, deletePost);

app.post('/sign-up',signUp);
app.post('/login', login);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API is running" });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
