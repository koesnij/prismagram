import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    me: (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      console.log('me', user.email);
      //return prisma.user({ id: user.id }).$fragment(USER_FRAGMENT);
      return prisma.user({ id: user.id });
    },
  },
};
