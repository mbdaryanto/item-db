import { Prisma, PrismaClient } from '@prisma/client'
import { JWTPayload, jwtVerify, SignJWT } from 'jose'

const resolvers = {
  Query: {
    login: async(_: any, { user }: {user: string, password: string}) => {
      const secretKey = Buffer.from(process.env.SECRET_KEY || '', 'base64url')
      // console.log(secretKey)
      const jwt = await new SignJWT({ user })
        .setSubject(user)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(secretKey)
      // console.log(jwt)

      const { payload, protectedHeader } = await jwtVerify(jwt, secretKey)
      // console.log(payload, protectedHeader)

      return {
        accessToken: jwt
      }
    },
    getItems: async (_: any, { term, take, skip }: { term?: string, take?: number, skip?: number }, { prisma }: { prisma: PrismaClient }) => {
      console.log('getItems resolver', { term, take, skip })
      // let items = await prisma.item.findMany()
      if (!term) {
        return await prisma.item.findMany({
          take: take ?? 20,
          skip: skip ?? 0,
        })
      }
      // find non empty keywords
      const keywords = term.split(' ').filter(keyword => keyword)
      if (keywords.length === 0) {
        return await prisma.item.findMany({
          take: take ?? 20,
          skip: skip ?? 0,
        })
      }

      const whereAnd = keywords.map(keyword => ({
        OR: [
          { 'barcode': { 'contains': keyword }, },
          { 'name': { 'contains': keyword }, },
          { 'description': { 'contains': keyword }, },
        ]
      }))

      return await prisma.item.findMany({
        where: {
          AND: whereAnd
        },
        take: take ?? 20,
        skip: skip ?? 0,
      })
    },
    getItem: async (
      _: any, { id }: { id: string }, { prisma }: { prisma: PrismaClient }
    ) => {
      console.log(`getItem by id ${id}`)
      const item = await prisma.item.findFirst({ where: { id: parseInt(id) }})
      return item
    },
    getItemByBarcode: async (
      _: any, { barcode }: { barcode: string }, { prisma }: { prisma: PrismaClient }
    ) => {
      console.log(`getItem by barcode ${barcode}`)
      const item = await prisma.item.findFirst({ where: { barcode }})
      return item
    }
  },
  Mutation: {
    createItem: async (
      _: any,
      data: {
        barcode: string
        name: string
        description?: string
        sellingPrice: number
      },
      { prisma, auth }: {
        prisma: PrismaClient
        auth?: JWTPayload
      }
    ) => {
      try {
        console.log(auth)
        const item = await prisma.item.create({ data })
        return {
          code: 200,
          success: true,
          message: `Successfully create item id ${item.id}`,
          item
        }
      } catch (err) {
        // console.log('Error createItem', err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (err.code === 'P2002') {
            return {
              code: 400,
              success: false,
              message: `Item with the same barcode already exists [${err.code}]`,
              item: null
            }
          }
          return {
            code: 400,
            success: false,
            message: `Error [${err.code}] ${err.message}`,
            item: null
          }
        }
        return {
          code: 400,
          success: false,
          message: `Failed to create item ${err}`,
          item: null
        }
      }
    },
    updateItem: async (
      _: any,
      { id, ...data }: {
        id: string
        barcode: string
        name: string
        description?: string
        sellingPrice: number
      },
      { prisma }: {
        prisma: PrismaClient
      }
    ) => {
      try {
        const item = await prisma.item.update({ where: { id: parseInt(id) }, data })
        return {
          code: 200,
          success: true,
          message: `Successfully update item id ${item.id}`,
          item
        }
      } catch (err) {
        // console.log('Error updateItem', err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (err.code === 'P2002') {
            return {
              code: 400,
              success: false,
              message: `Item with the same barcode already exists [${err.code}]`,
              item: null
            }
          }
          return {
            code: 400,
            success: false,
            message: `Error [${err.code}] ${err.message}`,
            item: null
          }
        }
        return {
          code: 400,
          success: false,
          message: `Failed to update item ${err}`,
          item: null
        }
      }
    },
    deleteItem: async (
      _: any,
      { id }: {
        id: string
      },
      { prisma }: {
        prisma: PrismaClient
      }
    ) => {
      try {
        const item = await prisma.item.delete({ where: { id: parseInt(id) } })
        return {
          code: 200,
          success: true,
          message: `Successfully delete item id ${item.id}`,
          item
        }
      } catch (err) {
        // console.log('Error deleteItem', err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          // if (err.code === 'P2002') {
          //   return {
          //     code: 400,
          //     success: false,
          //     message: `Item with the same barcode already exists [${err.code}]`,
          //     item: null
          //   }
          // }
          return {
            code: 400,
            success: false,
            message: `Error [${err.code}] ${err.message}`,
            item: null
          }
        }
        return {
          code: 400,
          success: false,
          message: `Failed to delete item ${err}`,
          item: null
        }
      }
    },
  }
}

export default resolvers;
