const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription.js')

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    AuthPayload,
    Subscription,
  },
  context(req) {
    return {
      ...req,
      db: new Prisma({
        typeDefs: 'src/generated/prisma.graphql',
        endpoint: 'https://us1.prisma.sh/david-kang/database/dev',
        secret: 'mysecret123',
        // debug: true,
      })
    }
  },

})
const PORT = server.options.port = process.env.PORT || 2000
server.start(() => console.log(`Server is running on http://localhost:${PORT}`))

/* resolvers */
/**
 * The resolvers object is the actual implementation of the GraphQL schema.
 * Notice how its structure is identical to the structure of the type definition inside typeDefs: Query.info.
 */
/**
 * Finally, the schema and resolvers are bundled and passed to the GraphQLServer
 * which is imported from graphql-yoga. This tells the server what API operations
 * are accepted and how they should be resolved.
 */
/**
 * The typeDefs constant defines your GraphQL schema.
 * Here, it defines a simple Query type with one field called info and is of type String!.
 * The exclamation mark in the type definition means that this field can never be null.
 */