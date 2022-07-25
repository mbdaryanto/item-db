import { useQuery } from '@apollo/client'
import { Divider, Input, LinkBox, LinkOverlay, List, ListItem, Text, VStack } from '@chakra-ui/react'
import { Fragment } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { GetItemsResultType, GetItemsVarType, GET_ITEMS } from '../components/queries'
import QueryResult from '../components/QueryResult'


export default function ItemListPage() {
  const [ searchParams, setSearchParams ] = useSearchParams({ term: '' })
  const { error, loading, data, refetch } = useQuery<GetItemsResultType, GetItemsVarType>(GET_ITEMS, {
    variables: { term: searchParams.get('term') ?? '' }
  })

  return (
    <VStack>
      <Text>Item List</Text>
      <Input value={searchParams.get('term') ?? ''} onChange={ev => {
        setSearchParams({ term: ev.target.value }, { replace: true })
        refetch({ term: searchParams.get('term') ?? '' })
      }} />
      <QueryResult error={error} loading={loading} data={data}>
        <List>
          {!!data && data!.items.map(row => (
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
