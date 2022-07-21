import { Outlet, Link } from 'react-router-dom'
import { HStack, Box, Center, Flex, Button } from '@chakra-ui/react'

const MAX_WIDTH = 1200

export default function LayoutPage() {
  return (
    <Box>
      <Center w="100%" height="60px" position="fixed" top="0" px="8px" bgColor="blue.200" zIndex="banner" boxShadow="md">
        <HStack as="nav" w="100%" maxW={MAX_WIDTH} spacing="20px" px="8px">
          <Button as={Link} to="/" variant="ghost">Home</Button>
          <Button as={Link} to="/item" variant="ghost">Items</Button>
        </HStack>
      </Center>
      <Flex mt="60px" w="100%" p="8px" minH="calc(100vh - 60px)" bgColor="gray.300" flexDir="column" align="center" justify="start">
        <Box w="100%" h="100%" maxW={MAX_WIDTH} boxShadow="md" bgColor="gray.50" borderWidth="0px" borderColor="gray.500" borderRadius="5px" p="8px">
          <Outlet/>
        </Box>
      </Flex>
    </Box>
  )
}
