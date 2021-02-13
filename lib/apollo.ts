import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Post } from '../generated/graphql'
import { NextPageContext } from 'next'
import { createWithApollo } from './createWithApollo'

const createClient = (_ctx: NextPageContext) => {
  let token: string | null

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    credentials: 'include',
  })

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
      },
    }
  })

  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: [],
              merge(
                existing: Array<Post> | undefined,
                incoming: Array<Post>
              ): Post[] {
                return [...existing || [], ...incoming]
              },
            },
          },
        },
      },
    }),
  })

  return client
}

export const withApollo = createWithApollo(
  (createClient as unknown) as ApolloClient<NormalizedCacheObject>
)
