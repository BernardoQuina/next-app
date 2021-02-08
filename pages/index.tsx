import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

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
    <div className='flex justify-center items-center w-screen h-screen'>
      <Head>
        <title>Home | Posts</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className=''>
        <h1 className=''>Posts from GraphQL</h1>
        <p className=''>
          These posts where fetch from a prisma 2.0 nexus backend
        </p>

        <div className=''>
          {posts.map((post) => {
            return (
              <Link href={`/post/${post.id}`} key={post.id}>
                <a className=''>
                  <h3>{post.title}</h3>
                  <div style={{ display: 'inline'}}>
                    <span>posted by: </span>
                    <strong>{post.author.name}</strong>
                  </div>
                  <p>{post.body}</p>
                </a>
              </Link>
            )
          })}
        </div>
      </main>
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
