import { NextPage } from 'next'
import NextLink from 'next/link'

import withApollo from '../lib/apollo'
import PostList from '../components/PostList'
import Header from '../components/Header'
import { usePostsQuery } from '../generated/graphql'

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const { data, loading, error } = usePostsQuery()

  if (error) {
    console.log(error)
  }

  return (
    <div>
      <Header />
      <NextLink href='/new-post'>
        <button
          className='flex mt-8 mx-auto py-2 px-4 rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white   active:bg-pink-900 active:border-pink-900'
          type='button'
        >
          new post
        </button>
      </NextLink>

      {!data || loading ? (
        <div>loading...</div>
      ) : (
        <PostList posts={data.posts} />
      )}
    </div>
  )
}

export default withApollo({ ssr: true })(Home)
