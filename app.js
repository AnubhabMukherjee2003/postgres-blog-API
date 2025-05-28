const express = require("express");
const cors = require("cors");

const { getAllPosts, getPostById } = require("./controller/pubOne");
const { createPost, updatePost, deletePost } = require("./controller/cmsOne");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/posts", getAllPosts);
app.get("/api/posts/:id", getPostById);

app.post("/api/posts", createPost);
app.put("/api/posts/:id", updatePost);
app.delete("/api/posts/:id", deletePost);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API is running" });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
