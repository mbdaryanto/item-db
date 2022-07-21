import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import ErrorBoundary from './components/ErrorBoundary'
import HomePage from './pages/Home';
import LayoutPage from './pages/Layout';
import ItemListPage from './pages/ItemList';
import ItemPage from './pages/Item';


const client = new ApolloClient({
  uri: () => 'http://localhost:4000/',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ChakraProvider>
          <ApolloProvider client={client}>
            <Routes>
              <Route path="/" element={<LayoutPage/>}>
                <Route index element={<HomePage/>}/>
                <Route path="item">
                  <Route index element={<ItemListPage/>}/>
                  <Route path=":itemId" element={<ItemPage/>}/>
                </Route>
              </Route>
            </Routes>
          </ApolloProvider>
        </ChakraProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
