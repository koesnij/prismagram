import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    // 나를 call한 resolver의 parent
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
  },
  amIFollowing: async (parent, _, { request }) => {
    const { user } = request;
    const { id: parentId } = parent;
    try {
      const exists = await prisma.$exists.user({
        AND: [{ id: parentId }, { followers_some: [user.id] }],
      });
      if (exists) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  itsMe: (parent, _, { request }) => {
    const { user } = request;
    const { id: parentId } = parent;
    return user.id === parentId;
  },
};
