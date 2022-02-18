const { prisma } = require("../lib");

class UserService {
  constructor() {}

  async getUsers(params) {
    try {
      return await prisma.user.findMany({
        include: {
          posts: true,
        },
      });
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
