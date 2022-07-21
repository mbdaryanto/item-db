import { gql, useQuery } from '@apollo/client'
import { Divider, LinkBox, LinkOverlay, List, ListItem, Text, VStack } from '@chakra-ui/react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import QueryResult from '../components/QueryResult'

export const GET_ITEMS = gql`
  query GetItems {
    getItems {
      id
      barcode
      name
      description
      sellingPrice
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
  getItems: ItemType[]
}

export default function ItemListPage() {
  const { error, loading, data } = useQuery<GetItemsResultType, {}>(GET_ITEMS)

  return (
    <VStack>
      <Text>Item List</Text>
      <QueryResult error={error} loading={loading} data={data}>
        <List>
          {!!data && data!.getItems.map(row => (
            <Fragment key={row.id}>
              <LinkBox
                as={ListItem}
                py="4"
                _hover={{ bgColor: 'gray.200' }}
              >
                <LinkOverlay as={Link} to={`/item/${row.id}`}>
                  {row.barcode}
                </LinkOverlay>
                {row.id}  {row.name} {row.sellingPrice}
              </LinkBox>
              <Divider/>
            </Fragment>
          ))}
        </List>
      </QueryResult>
    </VStack>
  )
}
