import { Outlet, Link } from 'react-router-dom'
import { HStack } from '@chakra-ui/react'

export default function LayoutPage() {
  return (
    <div>
      Layout
      <HStack as="nav">
        <Link to="/">Home</Link>
        <Link to="/item">Items</Link>
      </HStack>
      <Outlet/>
    </div>
  )
}
