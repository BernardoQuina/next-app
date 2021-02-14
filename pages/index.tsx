import { NextPage } from 'next'
import NextLink from 'next/link'

import { withApollo } from '../lib/apollo'
import { styles } from '../tailwind/styles'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import Header from '../components/Header'
import { usePostsQuery } from '../generated/graphql'
import { useState } from 'react'

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const [hasMore, setHasMore] = useState(true)

  const { data, loading, error, fetchMore } = usePostsQuery({
    variables: { skip: 0, take: 2 },
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  })

  if (error) {
    console.log(error)
  }

  return (
    <Layout>
      <Header />
      <NextLink href='/new-post'>
        <button
          className={styles.button}
          type='button'
        >
          new post
        </button>
      </NextLink>

      {!data ? (
        <div className='text-center mx-auto'>loading...</div>
      ) : (
        <>
          <PostList posts={data.posts} />
          {loading && <div className='text-center'>loading</div>}
          {hasMore ? (
            <button
              className={styles.button + 'mb-8'}
              onClick={async () => {
                const response = await fetchMore({
                  variables: {
                    skip: data.posts.length,
                    take: 2,
                  },
                })

                if (response.errors) {
                  if (
                    response.errors[0].message === 'Could not find any posts.'
                  ) {
                    setHasMore(false)
                  }
                }
              }}
            >
              load more
            </button>
          ) : (
            <div className='mb-8 text-center text-lg font-semibold'>no more posts</div>
          )}
        </>
      )}
    </Layout>
  )
}

export default withApollo({ ssr: true })(Home)
