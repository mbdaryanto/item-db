import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

import { typeDefs } from './schema'
import resolvers from './resolvers'

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

// console.log('env', process.env)
const port = parseInt(process.env.SERVER_PORT || '4000')

server.listen({
  port
}).then(({ url }) => {
  // port 4000
  console.log(`
    🚀  Server is running!
    🔉  Listening on ${url}
    📭  Query at https://studio.apollographql.com/sandbox/explorer
  `)
})
