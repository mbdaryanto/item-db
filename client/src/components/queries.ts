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
  query GetItems {
    items: getItems {
      ...CoreItemFields
    }
  }
`

export const GET_ITEM = gql`
  ${CORE_ITEM_FIELDS}
  query GetItem($itemId: ID!) {
    item: getItem(id: $itemId) {
      ...CoreItemFields
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

export interface GetItemsResultType {
  items: ItemType[]
}

export interface GetItemVarType {
  itemId: string
}

export interface GetItemResultType {
  item?: ItemType
}
