import { isAuthenticated } from '../../../middlewares';
export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      try {
        const existingLike = await prisma.$exists.like({
          AND: [
            {
              user: {
                id: user.id,
              },
            },
            {
              post: {
                id: postId,
              },
            },
          ],
        });
        if (existingLike) {
          // TO DO : removeLike
        } else {
          const newLike = await prisma.createLike({
            user: {
              connect: {
                id: user.id,
              },
            },
            post: {
              connect: {
                post: postId,
              },
            },
          });
        }
        return true;
      } catch {
        return false;
      }
    },
  },
};
