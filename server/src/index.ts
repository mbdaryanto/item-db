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
  },
  csrfPrevention: true,
  cors: {
    origin: ["http://localhost:3000", "https://studio.apollographql.com"]
  },
})

server.listen({
  port: process.env['PORT']
}).then(({ url }) => {
  // port 4000
  console.log(`
    🚀  Server is running!
    🔉  Listening on ${url}
    📭  Query at https://studio.apollographql.com/sandbox/explorer
  `)
})
