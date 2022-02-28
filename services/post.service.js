const { prisma } = require("../lib");

class PostService {
  constructor() {}

  async getPosts(where, orderBy, { skip, take }) {
    try {
      const data = await prisma.post.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          postComment: {
            include: {
              postComment: true,
            },
          },
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getPostDetail(id) {
    try {
      return await prisma.post.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          postComment: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
              postComments: true,
            },
          },
        },
        rejectOnNotFound: true,
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

  async postComment(id, body) {
    try {
      return await prisma.postComment.create({
        data: {
          content: body.content,
          author: {
            connect: {
              id: Number(body.authorId),
            },
          },
          post: {
            connect: {
              id: Number(id),
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async postCommentId(id, body) {
    try {
      return await prisma.postComment.create({
        data: {
          content: body.content,
          author: {
            connect: {
              id: Number(body.authorId),
            },
          },
          postComment: {
            connect: {
              id: Number(id),
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async postCommentDetail(id) {
    try {
      return await prisma.postComment.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          post: true,
          postComments: {
            include: {
              postComments: true,
            },
          },
          postComment: true,
        },
        rejectOnNotFound: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async deletePostComment(id) {
    try {
      return await prisma.postComment.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PostService;
