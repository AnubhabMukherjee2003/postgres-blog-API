const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const createPost = async (req, res) => {
  try {
    const { title, desc, uid, isPublish = false } = req.body;
    if (!title || !desc || !uid) {
      return res.status(400).json({
        error: "Missing required fields: title, desc, and uid are required",
      });
    }
    const user = await prisma.user.findUnique({
      where: { uid: parseInt(uid) },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await prisma.post.create({
      data: {
        title,
        desc,
        uid: parseInt(uid),
        isPublish: Boolean(isPublish),
        date: new Date(),
      },
      include: {
        author: {
          select: {
            uid: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, isPublish } = req.body;

    const existingPost = await prisma.post.findUnique({
      where: { pid: id },
    });

    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    const updatedPost = await prisma.post.update({
      where: { pid:id },
      data: {
        ...(title && { title }),
        ...(desc && { desc }),
        ...(isPublish !== undefined && { isPublish: Boolean(isPublish) }),
      },
      include: {
        author: {
          select: {
            uid: true,
            email: true,
          },
        },
      },
    });

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const existingPost = await prisma.post.findUnique({
      where: { pid: id },
    });
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    await prisma.post.delete({
      where: { pid: id },
    });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};
const getAllPostsAdmin = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {},
      include: {
        author: {
          select: {
            uid: true,
            email: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPostsAdmin
};
