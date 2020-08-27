import { prisma } from '../../../generated/prisma-client';

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;

      if (roomId === undefined) {
        // Create New Room
        if (user.id !== to) {
          room = await prisma.createRoom({
            participants: {
              connect: [{ id: toId }, { id: user.id }],
            },
          });
        }
      } else {
        // Find Existing Room
        room = await prisma.room({ id: roomdId });
      }
      if (!room) {
        throw Error('Room not found');
      }
      const message = await prisma.createMessage({ text: message, to: toId });
    },
  },
};
