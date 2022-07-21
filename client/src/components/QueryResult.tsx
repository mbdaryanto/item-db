import { ApolloError } from "@apollo/client";
import { Center, CircularProgress, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface QueryResultProps {
  error?: ApolloError
  loading: boolean
  data?: any
  children?: ReactNode
}

function QueryResult({ error, loading, data, children }: QueryResultProps) {
  // console.log('QueryResult', data)
  if (!!error) {
    return (
      <Center>
        <Text>
          ERROR: {error.message}
        </Text>
      </Center>
    )
  }

  if (loading) {
    return (
      <Center>
        <CircularProgress isIndeterminate/>
      </Center>
    )
  }

  if (!!data) {
    return <>{children}</>
  }

  return (
    <Center>
      <Text>
        Nothing to show...
      </Text>
    </Center>
  )
}

export default QueryResult
