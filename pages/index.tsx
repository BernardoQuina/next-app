import { GetStaticProps, NextPage } from 'next'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import PostList from '../components/PostList'

interface HomeProps {
  posts: {
    id: string
    title: string
    body: string
    published: boolean
    userId: string
    author: {
      name: string
    }
  }[]
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div>
        <PostList posts={posts} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  })

  const {
    data: { posts },
  } = await client.query({
    query: gql`
      query {
        posts {
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
  })

  return {
    props: {
      posts,
    },
  }
}

export default Home
