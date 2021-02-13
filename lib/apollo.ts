import { withApollo } from 'next-apollo'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'


export function createApolloClient() {
  // Declare variable to store authToken
  let token: string | null;
  
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    credentials: 'include',
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('authToken')
    }
    
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      }
    }
  });

  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return client
}

export default withApollo(createApolloClient)