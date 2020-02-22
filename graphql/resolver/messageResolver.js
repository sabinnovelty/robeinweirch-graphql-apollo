import uuidv1 from 'uuid/v1';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isMessageOwner } from '../middleware/authorization';
import pubsub, { EVENTS } from '../subscription/index';
import Message from '../model/message.model';

const messageResolver = {
    Query: {
        me: () => {
            return { username: "JOhn" }
        },
        message: (parent, { id }, context, info) => {
            console.log('message')
            return messages[1]
        },
        messages: (parent, args) => {
            console.log('messages')
            return messages.map(x => {
                return x;
            })
        }

    },
    Mutation: {
        createMessage: (parent, { title }, context) => {
            console.log('Message title', title);
            console.log('authenticated user', context)
            let message = {
                text: title,
                id: uuidv1(),
                userId: context.authUser.id

            }
            context.model.messages.push(message);
            return message;
        },
        deleteMessage: combineResolvers(
            isMessageOwner,
            async (parent, { id }, { me, model }) => {
                const deleteMessage = await model.Message.destroy({ where: { id } });
                return true;
            }
        )

    },
    Subscription: {
        messageCreated: {
            subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.MESSAGE_CREATED),
        },
    },

    // here Users is also called as default resolver
    Message: {
        user: (parent, args, { model }, info) => {
            console.log('message id', parent);
            // console.log('context', context)
            return model.users[parent.userId]
        }
    }

}

export default messageResolver;