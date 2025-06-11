const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { isPublish: true },
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

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // UUID validation - basic check for UUID format
    if (!id || typeof id !== 'string' || id.length < 10) {
      return res.status(400).json({ error: "Invalid post ID" });
    }
    
    const post = await prisma.post.findUnique({
      where: { pid: id },
      include: {
        author: {
          select: {
            uid: true,
            email: true,
          },
        },
      },
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
};