const { prisma } = require("../lib");

class PostService {
  constructor() {}

  async getPosts(where, orderBy) {
    try {
      return await prisma.post.findMany({
        where,
        orderBy,
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

  async updatePost(id, { title, content, published, authorId }) {
    try {
      return await prisma.post.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          content,
          published,
          author: {
            connect: {
              id: Number(authorId),
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deletePost(id) {
    try {
      return await prisma.post.delete({
        where: { id: Number(id) },
        include: {
          author: true,
          postComment: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PostService;
