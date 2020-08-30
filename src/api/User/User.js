import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    posts: ({ id }) => prisma.user({ id }).posts(),
    following: ({ id }) => prisma.user({ id }).following(),
    followers: ({ id }) => prisma.user({ id }).followers(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    rooms: ({ id }) => prisma.user({ id }).rooms(),
    followingCount: ({ id }) =>
      prisma
        .usersConnection({ where: { followers_some: { id } } })
        .aggregate()
        .count(),
    followersCount: ({ id }) =>
      prisma
        .usersConnection({ where: { following_some: { id } } })
        .aggregate()
        .count(),

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
};
