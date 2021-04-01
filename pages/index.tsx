import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { motion } from 'framer-motion'

import { withApollo } from '../lib/apollo'
import { PostSnippetFragment, usePostsQuery } from '../generated/graphql'
import { Layout } from '../components/Layout'
import { PostList } from '../components/PostList'
import { Header } from '../components/Header'
import { NewPostModal } from '../components/NewPostModal'
import { variants } from '../utils/animations'
import { Loader } from '../components/Loader'

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const [posts, setPost] = useState<PostSnippetFragment[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [showNewPostModal, setShowNewPostModal] = useState(false)

  const { data, loading, fetchMore } = usePostsQuery({
    variables: { skip: 0, take: 8 },
    errorPolicy: 'all',
  })

  useEffect(() => {
    setPost(data?.posts!)
    if (data && (data.posts.length % 2 !== 0 || data.posts.length < 8)) {
      setHasMore(false)
    }
  }, [data])

  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ duration: 0.2 }}
      variants={variants}
    >
      <Layout>
        <div>
          <Header />
          <NewPostModal
            showModal={showNewPostModal}
            setShowModal={setShowNewPostModal}
          />
          <button
            className='flex mt-8 mx-auto py-2 px-4 rounded-md shadow-md text-lg  font-bold tracking-wide text-pink-600 focus:outline-none transform hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900'
            type='button'
            onClick={() => setShowNewPostModal(!showNewPostModal)}
          >
            new post
          </button>

          {!posts && !loading ? (
            <div className='mb-8 text-center text-lg font-semibold'>
              no posts
            </div>
          ) : !posts ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              <PostList posts={posts} />
              {loading && <Loader />}
              {hasMore ? (
                <button
                  className='flex mt-8 mx-auto py-2 px-4 rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white focus:outline-none mb-8'
                  onClick={async () => {
                    const response = await fetchMore({
                      variables: {
                        skip: posts.length,
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

                    if (response.data.posts) {
                      setPost(posts.concat(response.data.posts!))
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

export default withApollo({ ssr: true })(Home)
