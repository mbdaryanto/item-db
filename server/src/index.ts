import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import { jwtVerify } from 'jose'
import 'dotenv/config'

import { typeDefs } from './schema'
import resolvers from './resolvers'

const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let auth = null
    const token = req.headers.authorization || ''
    const accessToken = token.split(' ')[1] // get the access token after 'Bearer '
    if (!!accessToken) {
      const secretKey = Buffer.from(process.env.SECRET_KEY || '', 'base64url')
      const { payload } = await jwtVerify(accessToken, secretKey)
      // console.log(payload, protectedHeader)
      auth = payload
    }
    return {
      prisma,
      auth,
    }
  },
  csrfPrevention: true,
  cors: {
    origin: ["http://localhost:3000", "https://studio.apollographql.com"]
  },
})

// console.log('env', process.env)
const port = Number(process.env.SERVER_PORT) || 4000

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
