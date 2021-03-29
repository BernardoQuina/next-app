import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context'
import { Post } from '../generated/graphql'
import { NextPageContext } from 'next'
import { createWithApollo } from './createWithApollo'
import { getMainDefinition } from '@apollo/client/utilities'

const createClient = (_ctx: NextPageContext) => {
  const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    credentials: 'include',
  })

  const wsLink = process.browser ? new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
      reconnect: true,
    },
  }) : null

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
      },
    }
  })

  const splitLink = process.browser ? split(
    ({query}) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink as WebSocketLink,
    authLink.concat(httpLink)
  ) : authLink.concat(httpLink)

  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: splitLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: [],
              merge(
                existing: Array<Post> | [] = [],
                incoming: Array<Post>
              ): Post[] {
                return [...existing, ...incoming]
              },
            },
            myPosts: {
              keyArgs: [],
              merge(
                existing: Array<Post> | [] = [],
                incoming: Array<Post>
              ): Post[] {
                return [...existing, ...incoming]
              },
            },
            comments: {
              keyArgs: [],
              merge(
                existing: Array<Comment> | [] = [],
                incoming: Array<Comment>
              ): Comment[] {
                return [...existing, ...incoming]
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
