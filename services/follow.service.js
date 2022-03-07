const { prisma, pagination } = require("../lib");

class FollowService {
  constructor() {}

  getFollows(where, orderBy, { skip, take }) {
    try {
      const paginate = pagination("follows", {
        where,
        orderBy,
        skip,
        take,
        include: {
          following: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          follower: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return paginate;
    } catch (error) {
      throw new Error("getFollowerByUserId: " + error.message);
    }
  }

  async followById(userId, targetUserId) {
    try {
      if (Number(userId) === Number(targetUserId)) {
        throw new Error("Cannot follow your self!");
      }

      const findIfExists = await prisma.follows.findUnique({
        where: {
          followerId_followingId: {
            followerId: Number(targetUserId),
            followingId: Number(userId),
          },
        },
      });

      if (findIfExists) {
        throw new Error("Already following");
      }

      return await prisma.follows.create({
        include: {
          follower: {
            select: {
              name: true,
            },
          },
          following: {
            select: {
              name: true,
            },
          },
        },
        data: {
          follower: {
            connect: {
              id: Number(targetUserId),
            },
          },
          following: {
            connect: {
              id: Number(userId),
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async unfollowById(userId, targetUserId) {
    try {
      const findIfExists = await prisma.follows.findUnique({
        where: {
          followerId_followingId: {
            followerId: Number(targetUserId),
            followingId: Number(userId),
          },
        },
        rejectOnNotFound: true,
      });

      if (!findIfExists) {
        throw new Error("Not following");
      }

      return await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: Number(targetUserId),
            followingId: Number(userId),
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FollowService;
