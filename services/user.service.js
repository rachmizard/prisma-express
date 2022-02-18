const { prisma } = require("../lib");

class UserService {
  constructor() {}

  async getUsers(where, orderBy) {
    try {
      const users = await prisma.user.findMany({
        where,
        orderBy,
        include: {
          posts: true,
          postComment: true,
        },
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async storeUser(body) {
    try {
      return await prisma.user.create({
        data: body,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, body) {
    try {
      return await prisma.user.update({
        where: { id: Number(id) },
        data: body,
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
