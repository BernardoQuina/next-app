import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'

import Meta from '../../../components/Meta'

interface PostProps {
  post: {
    id: string
    title: string
    body: string
    published: boolean
    userId: string
    author: {
      name: string
    }
  }
}

const post: NextPage<PostProps> = ({ post }) => {

  return (
    <>
      <Meta title={post.title} description={post.body} />
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <br/>
      <Link href='/'>Go Back</Link>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  })

  const {
    data: { post },
  } = await client.query({
    query: gql`
      query ($postId: String!) {
        post (where: {id: $postId}) {
          id
          title
          body
          published
          createdAt
          updatedAt
          author {
            name
          }
        }
      }
    `,
    variables: { postId: context.params?.id }
  })

  return {
    props: {
      post
    }
  }
}

export default post
