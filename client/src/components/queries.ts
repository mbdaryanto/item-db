import { gql } from "@apollo/client"


export const CORE_ITEM_FIELDS = gql`
  fragment CoreItemFields on Item {
    id
    barcode
    name
    description
    sellingPrice
  }
`

export const GET_ITEMS = gql`
  ${CORE_ITEM_FIELDS}
  query GetItems($term: String) {
    items: getItems(term: $term) {
      ...CoreItemFields
    }
  }
`

export const GET_ITEM = gql`
  ${CORE_ITEM_FIELDS}
  query GetItem($id: ID!) {
    item: getItem(id: $id) {
      ...CoreItemFields
    }
  }
`

export const GET_ITEM_BY_BARCODE = gql`
  ${CORE_ITEM_FIELDS}
  query GetItemByBarcode($barcode: String!) {
    item: getItemByBarcode(barcode: $barcode) {
      ...CoreItemFields
    }
  }
`

export const CREATE_ITEM = gql`
  ${CORE_ITEM_FIELDS}
  mutation CreateItem($barcode: String!, $name: String!, $sellingPrice: Float!, $description: String) {
    createItem(barcode: $barcode, name: $name, sellingPrice: $sellingPrice, description: $description) {
      code
      success
      message
      item {
        ...CoreItemFields
      }
    }
  }
`

export const UPDATE_ITEM = gql`
  ${CORE_ITEM_FIELDS}
  mutation UpdateItem($id: ID!, $barcode: String!, $name: String!, $sellingPrice: Float!, $description: String) {
    updateItem(id: $id, barcode: $barcode, name: $name, sellingPrice: $sellingPrice, description: $description) {
      code
      success
      message
      item {
        ...CoreItemFields
      }
    }
  }
`

export interface ItemType {
  id: string
  barcode: string
  name: string
  description?: string
  sellingPrice: number
}

export interface GetItemsVarType {
  term?: string
}

export interface GetItemsResultType {
  items: ItemType[]
}

export interface GetItemVarType {
  id: string
}

export interface GetItemResultType {
  item?: ItemType
}

export interface GetItemByBarcodeVarType {
  barcode: string
}

export interface GetItemByBarcodeResultType {
  item?: ItemType
}

export type UpdateItemVarType = ItemType

export interface UpdateItemResponseType {
  code: number
  success: boolean
  message: string
  item?: ItemType
}

export type CreateItemVarType = Omit<ItemType, 'id'>

export type CreateItemResponseType = UpdateItemResponseType
