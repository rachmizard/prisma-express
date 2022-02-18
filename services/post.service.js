const { prisma } = require("../lib");

class PostService {
  constructor() {}

  async getPosts(generatedParams) {
    try {
      return await prisma.post.findMany({
        include: {
          author: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async storePost(body) {
    try {
      return await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          published: body.published,
          author: {
            connect: {
              id: Number(body.authorId),
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PostService;
