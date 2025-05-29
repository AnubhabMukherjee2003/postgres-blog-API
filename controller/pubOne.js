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
            username: true,
          },
        },
      },
      orderBy: {
        pid: "desc",
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
    const post = await prisma.post.findUnique({
      where: { pid: parseInt(id)},
      include: {
        author: {
          select: {
            uid: true,
            username: true,
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