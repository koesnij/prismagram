import { prisma } from '../../../generated/prisma-client';

export default {
  Post: {
    files: ({ id }) => prisma.post({ id }).files(),
    comments: ({ id }) => prisma.post({ id }).comments(),
    user: ({ id }) => prisma.post({ id }).user(),
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
    likeCount: ({ id }) =>
      prisma
        .likesConnection({ where: { post: { id } } })
        .aggregate()
        .count(),
    commentCount: ({ id }) =>
      prisma
        .commentsConnection({ where: { post: { id } } })
        .aggregate()
        .count(),
  },
};
