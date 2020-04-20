import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchUser: async (_, { term }) =>
      await prisma.users({
        where: {
          OR: [
            { username_contains: term },
            { firstName_contains: term },
            { lastName_contains: term },
          ],
        },
      }),
  },
};
