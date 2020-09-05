import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated }) => {
      const { user } = request;
      console.log('seeFeed', user.email);
      const following = await prisma.user({ id: user.id }).following();
      console.log([...following.map(user => user.id), user.id]);
      return prisma.posts({
        where: {
          user: {
            id_in: [...following.map(user => user.id), user.id],
          },
        },
        orderBy: 'createdAt_DESC',
      });
    },
  },
};
