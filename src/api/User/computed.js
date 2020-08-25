import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    // 나를 call한 resolver의 parent
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },

    isFollowing: (parent, _, { request }) => {
      const { user } = request;
      try {
        return prisma.$exists.user({
          AND: [
            {
              id: parent.id,
            },
            {
              followers_some: { id: user.id },
            },
          ],
        });
        // prisma가 에러를 씹을 수도 있음. playground에서 디버깅
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
  },
  Post: {
    isLiked: async (parent, _, { request }) => {
      const { user } = request;
      console.log(parent);
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
  },
};
