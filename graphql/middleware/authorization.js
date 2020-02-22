//grqphql-resolver helps to create a smart resolver . Mainly it is used for avoiding repteing code in resolver function.
import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';
import Message from '../model/message.model';
// export const isAuthenticated = (parent, args, { me }) =>
//   me ? skip : new ForbiddenError('Not authenticated as user.');

const isAuthenticated = (parent, args, { me }) => me ? skip : new ForbiddenError('No authenticated as user.');

const isMessageOwner = async (parent, args, { me }) => {
    console.log('messageId', args.id)
    const message = await Message.findOne({ where: { id: args.id } });
    console.log('message', message);
    console.log('uiser', me)
    if (message.userId != me.id) {
        console.log('88888888888888888')
        throw new ForbiddenError('You are not authorized to perform this operation');
    }
    return skip;
}

module.exports = { isAuthenticated, isMessageOwner };