import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    "Get all items"
    getItems: [Item!]!
    "Get item by id"
    getItem(id: ID!): Item
    "Get item by barcode"
    getItemByBarcode(barcode: String!): Item
  }

  type Mutation {
    "Create new item"
    createItem(barcode: String!, name: String!, description: String, sellingPrice: Float!): Item!
  }

  type Item {
    id: ID!
    barcode: String!
    name: String!
    description: String
    sellingPrice: Float!
  }
`
