import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeFullPost: (_, args) => {
      const { id } = args;
      console.log('seeFullPost', args);
      return prisma.post({ id });
    },
  },
};
