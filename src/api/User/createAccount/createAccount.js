import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = '', lastName = '', bio = '' } = args;
      console.log('createAccount', args);
      if (await prisma.$exists.user({ username })) {
        throw Error('This Username is already taken.');
      }
      if (await prisma.$exists.user({ email })) {
        throw Error('This Email is already taken.');
      }
      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio,
      });
      return true;
    },
  },
};
