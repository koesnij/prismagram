import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, email, firstName, lastName, bio } = args;
      const { user } = request;
      // await keyword를 붙일 필요가 없음!
      // 마지막 문장이기 때문에 서버는 이 promise가
      // resolve되어 브라우저에게 결과를 전달하길 기다려 줌.
      return prisma.updateUser({
        where: {
          id: user.id,
        },
        // 빈 parameter를 보내면 prisma가 이전 값을 보존해 줌.
        data: { username, email, firstName, lastName, bio },
      });
    },
  },
};
