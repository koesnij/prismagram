import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      console.log('seeRoom', args, user.email);
      const canSee = await prisma.$exists.room({
        participants_some: { id: user.id },
      });
      if (canSee) {
        return prisma.room({ id });
      } else {
        throw Error("You can't see this!");
      }
    },
  },
};
