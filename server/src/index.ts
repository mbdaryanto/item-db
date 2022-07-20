import { ApolloServer } from 'apollo-server'

import { typeDefs } from './schema'
import resolvers from './resolvers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      prisma
    }
  }
})

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/sandbox/explorer
  `)
})
