import { NextPage } from 'next'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import {  } from '@apollo/client'
import { withApollo } from '../lib/apollo'
import { usePostsQuery } from '../generated/graphql'
import { Layout } from '../components/Layout'
import { PostList } from '../components/PostList'
import { Header } from '../components/Header'
import { motion, Variants } from 'framer-motion'

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const [hasMore, setHasMore] = useState(true)

  const { data, loading, error, fetchMore } = usePostsQuery({
    variables: { skip: 0, take: 8 },
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  })

  useEffect(() => {
    if (data && (data.posts.length % 2 !== 0 || data.posts.length < 8)) {
      setHasMore(false)
    }
  }, [data])

  if (error) {
    console.log(error)
  }

  if (!loading && !data) {
    return (
      <div>
        <p>your query failed...</p>
        <p>{error?.message}</p>
      </div>
    )
  }

  return (
    <motion.div
      initial='hidden'
      animate='active'
      exit='exit'
      transition={{ duration: 0.3 }}
      variants={variants}
    >
      <Layout>
        <div>
          <Header />
          <NextLink href='/new-post'>
            <button
              className='flex mt-8 mx-auto py-2 px-4 rounded-md text-pink-600 border border-pink-600 focus:outline-none hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900'
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
              {loading && <div className='text-center'>loading...</div>}
              {hasMore ? (
                <button
                  className='flex mt-8 mx-auto py-2 px-4 rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900 mb-8'
                  onClick={async () => {
                    const response = await fetchMore({
                      variables: {
                        skip: data.posts.length,
                        take: 4,
                      },
                    })

                    if (
                      response.data === null ||
                      response.data.posts.length < 4
                    ) {
                      setHasMore(false)
                    }

                    if (response.errors) {
                      if (
                        response.errors[0].message ===
                        'Could not find any posts.'
                      ) {
                        setHasMore(false)
                      }
                    }
                  }}
                >
                  load more
                </button>
              ) : (
                <div className='mb-8 text-center text-5xl font-semibold text-gray-500'>
                  .
                </div>
              )}
            </>
          )}
        </div>
      </Layout>
    </motion.div>
  )
}

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  active: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
  },
}

export default withApollo({ ssr: true })(Home)
