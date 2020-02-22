import { gql } from 'apollo-server-express';
import userSchema from './user';
import messageSchema from './message';
const linkSchema = gql`

scalar Date
   type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;
export default [linkSchema, userSchema, messageSchema];

//note
// 1. when we modularize the schema and resolver on their own file we must have to use `extend` keyword on Query type and mutation.