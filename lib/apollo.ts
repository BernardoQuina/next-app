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

  console.log('url: ', process.env.NEXT_PUBLIC_API_URL)
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
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
                existing: Array<Post> | [] = [],
                incoming: Array<Post>,
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
                incoming: Array<Comment>,
              ): Comment[] {
                return [...existing, ...incoming]
              }
            }
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
