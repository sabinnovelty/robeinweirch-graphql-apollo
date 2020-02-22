import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import schema from './graphql/schema';
import resolver from './graphql/resolver/index';
import model from './graphql/model/index';
import { sequelize } from './graphql/connection/db.connection';
import { PORT } from './graphql/config/env.config';
import { verifyToken } from './graphql/middleware/index';
import http from 'http';

const app = express();

app.use(cors());

const httpServer = http.createServer(app);


const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs: schema,
    resolvers: resolver,
    formatError: error => {
        console.log('Error thrown from resolver can be customize here.', error, typeof error);
        return error;
    },
    //context is an object that is shared among all the resolvers
    //mainly in context we store authenticated users , datasource , dbconnection object that is required in resolver to run our business logic
    // context: {
    //     datasource: 'mysql',
    //     model,
    //     authUser: { id: 1 }
    // }
    context: async ({ req }) => {
        const me = await verifyToken(req)
        return {
            datasource: 'mysql',
            model,
            me,
            authUser: { id: 1 }
        }
    }
});



server.applyMiddleware({ app, path: '/graphql' });

server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
    console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});