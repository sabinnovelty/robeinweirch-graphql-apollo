import uuidv1 from 'uuid/v1';
import { generateToken } from '../middleware/index';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../middleware/authorization'
const userResolver = {
    Query: {
        me: () => {
            return { username: "JOhn" }
        },
        //argument passed in the queryq can be obtained in reoslve in second argument
        //parent is called root argument
        //info argument gives internal information about the grqphql request and mainly used for error handling , advance monitoring nad tracking.
        user: (parent, { id }, context, info) => {
            throw new Error('no user found')
        },
        users: combineResolvers(
            isAuthenticated,
            async (parent, args, { model, me }) => {
                console.log('auth user', me);
                let page = args.offset;
                let limit = args.limit;
                let offset = page * limit
                const users = await model.User.findAll({
                    limit, offset
                });
                console.log('users', users);
                return users;
            }
        ),
        signIn: async (parent, { email, password }, { model, secret }) => {
            console.log('emial', email)
            const user = await model.User.findOne({ where: { email: email } });
            if (!user) {
                throw new UserInputError('User not found!')
            }
            let isValid = await user.validatePassword(password);
            console.log('isValid', isValid)
            if (!isValid) {
                throw new AuthenticationError('User Authentication failed!')
            }
            let token = generateToken(user);
            let userInfo = Object.assign(user, { token })
            return userInfo;


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
            messages.push(message);
            return message;
        },
        createUser: async (parent, { username, email, password }, { model }) => {
            console.log('user name', username);
            let user = await model.User.create({
                username, email, password
            });
            console.log('user create', user)
            return Object.assign(user, { token: generateToken(user) })
        },
        createUserWithMessage: async (parent, { id, message }, { model }) => {
            const user_message = await model.Message.create({
                userId: id, text: message
            });
            console.log('user message', user_message);
            return user_message;
        },
        signUp: async (_, args, { model }) => {
            console.log(args.user)
            const register = await model.User.create(args.user);
            console.log('user register', register);
            return true;
        }
    },
    // here Users is also called as default resolver
    Message: {
        user: (parent, args, context, info) => {
            console.log('message id', parent);
            // console.log('context', context)
            return users[parent.userId]
        }
    },
    User: {
        messages: (parent) => {
            console.log('User message', parent)
            return [{
                id: '1',
                text: 'Hello World',
                userId: 2
            },
            {
                id: '2',
                text: 'By World',
                userId: 1
            }]
            // return messages.filter(x => {
            //     return parent.message == x.id
            // })
        }
    }

}

export default userResolver;