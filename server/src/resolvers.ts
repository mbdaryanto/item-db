import { Prisma, PrismaClient } from '@prisma/client'

const resolvers = {
  Query: {
    getItems: async (_: any, { term }: { term?: string }, { prisma }: { prisma: PrismaClient }) => {
      console.log('getItems resolver')
      // let items = await prisma.item.findMany()
      if (!term) {
        return await prisma.item.findMany()
      }
      // find non empty keywords
      const keywords = term.split(' ').filter(keyword => keyword)
      if (keywords.length === 0) {
        return await prisma.item.findMany()
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
        }
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
      { prisma }: {
        prisma: PrismaClient
      }
    ) => {
      try {
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
    }
  }
}

export default resolvers;
