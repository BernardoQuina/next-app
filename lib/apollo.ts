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
  let uri

  if (process.env.NODE_ENV === 'development') {
    uri = 'http://localhost:4000/graphql'
  } else {
    uri = process.env.NEXT_PUBLIC_API_URL
  }

  const httpLink = createHttpLink({
    uri,
    credentials: 'include',
  })

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
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
