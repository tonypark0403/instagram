import Constants from "../Shared/Constants";

export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem(Constants.TOKEN)),
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem(Constants.TOKEN, token);
      cache.writeData({
        data: {
          isLoggedIn: true,
        },
      });
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem(Constants.TOKEN);
      // to remove cache...
      window.location = "/";
      return null;
    },
  },
};
