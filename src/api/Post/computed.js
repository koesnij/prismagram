import { prisma } from '../../../generated/prisma-client';

export default {
  Post: {
    isLiked: (parent, _, { request }) => {
      const { user } = request;
      return prisma.$exists.like({
        AND: [
          {
            post: { id: parent.id },
          },
          {
            user: { id: user.id },
          },
        ],
      });
    },
    likeCount: parent =>
      prisma
        .likesConnection({ where: { post: { id: parent.id } } })
        .aggregate()
        .count(),
  },
};
