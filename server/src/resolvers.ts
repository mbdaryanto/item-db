import { ID } from 'type-graphql'
import { PrismaClient } from '@prisma/client'


const resolvers = {
  Query: {
    getItems: async (_: any, __: any, { prisma }: { prisma: PrismaClient }) => {
      console.log('getItems resolver')
      const items = await prisma.item.findMany()
      return items.map(row => ({ ...row, id: row.id.toString() }))
    },
    getItem: async (
      _: any, { id }: { id: typeof ID }, { prisma }: { prisma: PrismaClient }
    ) => {
      console.log(`getItem by id ${id.toString()}`)
      const item = await prisma.item.findFirst({ where: { id: parseInt(id.toString()) }})
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
      const newItem = await prisma.item.create({ data })
      return newItem
    }
  }
}

export default resolvers;
