import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_ITEM, GetItemResultType, GetItemVarType } from "../components/queries"
import QueryResult from "../components/QueryResult"


function ItemPage() {
  const { itemId } = useParams()
  console.log('ItemPage', itemId)
  const { loading, error, data } = useQuery<GetItemResultType, GetItemVarType>(
    GET_ITEM,
    {
      variables: {
        itemId: itemId ?? ''
      }
    }
  )

  return (
    <QueryResult loading={loading} error={error} data={data}>
      {data?.item?.barcode}
    </QueryResult>
  )
}

export default ItemPage
