import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './userResolver';
import messageResolvers from './messageResolver';

const customScalarResolver = {
    Date: GraphQLDateTime,
};

export default [userResolvers, messageResolvers, customScalarResolver];
