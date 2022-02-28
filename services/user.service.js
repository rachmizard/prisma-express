const { prisma } = require("../lib");
const { createCryptoHashedPassword } = require("../lib/crypto");

class UserService {
  constructor() {}

  async getUsers(where, orderBy, { skip, take }) {
    try {
      const users = await prisma.user.findMany({
        where,
        orderBy,
        skip,
        take,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          role: true,
          hashedToken: false,
          salt: false,
          posts: true,
        },
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUser(id) {
    try {
      return await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          role: true,
          hashedToken: false,
          salt: false,
          posts: true,
          followedBy: {
            include: {
              following: true,
            },
          },
          following: {
            include: {
              follower: true,
            },
          },
        },
        rejectOnNotFound: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async storeUser(body) {
    try {
      const { hash, salt } = createCryptoHashedPassword(body.password);

      Object.assign(body, { hashedToken: hash, salt, password: salt });

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
