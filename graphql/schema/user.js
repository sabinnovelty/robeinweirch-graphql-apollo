import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        me:String,
        user(id:ID!):User,
        users(offset:Int,limit:Int):[User],
        signIn(email:String,password:String):User     
    }

    extend type Mutation {
        createUser(username:String!,email:String,password:String):User
        createUserWithMessage(id:ID!,message:String!):UserMessage,
        signUp(user:registerInput):Boolean
    }



    type UserMessage {
        id:ID,
        text:String,
        userId:Int
    }

    input registerInput{
        username:String,
        email:String,
        password:String
    }

    type User {
        username:String!,
        id:ID!,
        email:String,
        messages:[Message],
        token:String,
        message:String
    }
    # type UserNotFoundError {
    #     message:String!
    # }

    # union UserResult = User | UserNotFoundError

   


`