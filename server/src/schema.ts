import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    "Login"
    login(user: String!, password: String!): LoginResponse!
    "Get all items"
    getItems(term: String, take: Int, skip: Int): [Item!]!
    "Get item by id"
    getItem(id: ID!): Item
    "Get item by barcode"
    getItemByBarcode(barcode: String!): Item
  }

  type Mutation {
    "Create new item"
    createItem(barcode: String!, name: String!, description: String, sellingPrice: Float!): CreateUpdateItemResponse!
    "Update item"
    updateItem(id: ID!, barcode: String!, name: String!, description: String, sellingPrice: Float!): CreateUpdateItemResponse!
    "Delete item"
    deleteItem(id: ID!): CreateUpdateItemResponse!
  }

  type Item {
    id: ID!
    barcode: String!
    name: String!
    description: String
    sellingPrice: Float!
  }

  type LoginResponse {
    accessToken: String!
  }

  type CreateUpdateItemResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated item after a successful mutation"
    item: Item
  }

  type CreateUpdateItemResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated item after a successful mutation"
    item: Item
  }
`
