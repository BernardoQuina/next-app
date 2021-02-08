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
    <div className='md:container md:mx-auto px-4 flex justify-center'>
      <Head>
        <title>Home | Posts</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
          rel='stylesheet'
        />
      </Head>
      <main className='pt-20'>
        <h1 className='text-center text-5xl font-semibold pt-6 pb-5'>
          Posts from <span className='text-pink-600 font-bold'>GraphQL</span>
        </h1>
        <p className='text-center text-xl'>
          These posts where fetch from a prisma 2.0 nexus backend
        </p>

        <div className='my-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl'>
          {posts.map((post) => {
            return (
              <Link href={`/post/${post.id}`} key={post.id}>
                <a className='p-4 rounded-md shadow-md hover:border hover:border-pink-600 hover:text-pink-600 transform hover:scale-105 active:scale-100'>
                  <h3 className='text-xl font-bold'>{post.title}</h3>
                  <div className='flex text-sm text-gray-400 mb-4'>
                    <span>posted by</span>
                    <strong className='pl-2'>{post.author.name}</strong>
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
