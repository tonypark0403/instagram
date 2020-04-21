import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMNET } from "../../../fragments";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      if (roomId === undefined) {
        // for create
        if (user.id !== toId) {
          room = await prisma
            .createRoom({
              participants: {
                connect: [{ id: toId }, { id: user.id }],
              },
            })
            .$fragment(ROOM_FRAGMNET);
        }
      } else {
        room = await prisma
          .room({
            id: roomId,
          })
          .$fragment(ROOM_FRAGMNET);
      }
      if (!room) {
        throw Error("Room is not found");
      }
      const getTo = room.participants.filter(
        (participant) => participant.id !== user.id
      )[0];
      return prisma.createMessage({
        text: message,
        from: {
          connect: { id: user.id },
        },
        to: {
          connect: {
            id: roomId ? getTo.id : toId,
          },
        },
        room: {
          connect: {
            id: room.id,
          },
        },
      });
    },
  },
};
