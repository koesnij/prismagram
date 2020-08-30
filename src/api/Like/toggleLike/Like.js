import { prisma } from '../../../../generated/prisma-client';

export default {
  Like: {
    user: ({ id }) => prisma.like({ id }).post(),
    post: ({ id }) => prisma.like({ id }).post(),
  },
};
