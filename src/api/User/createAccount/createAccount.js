import { prisma } from "../../../../generated/prisma-client";
export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio,
      });
      return true; //if error => return false automatically
    },
  },
};
