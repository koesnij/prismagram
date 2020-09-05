import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeRooms: (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      console.log('seeRooms', user.email);
      return prisma.rooms({
        where: {
          participants_some: {
            id: user.id,
          },
        },
      });
    },
  },
};
