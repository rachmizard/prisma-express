const prisma = require("./prisma");

module.exports = async function prismaPaginate(modelName, query) {
  const limit = query.take > 0 ? query.take : 10;
  const page = query.skip > 0 ? query.skip : 1;
  const skip = (query.skip - 1) * limit;

  Object.assign(query, { skip, take: limit });

  const [totalRecords, data] = await prisma.$transaction([
    prisma[modelName].count({
      where: query.where,
    }),
    prisma[modelName].findMany(query),
  ]);

  return {
    paginate: {
      page,
      limit,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      hasNextPage: page < Math.ceil(totalRecords / limit),
      hasPreviousPage: page > 1,
    },
    data,
  };
};
