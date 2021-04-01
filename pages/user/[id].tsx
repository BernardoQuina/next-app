import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { Layout } from '../../components/Layout'
import { Meta } from '../../components/Meta'
import { variants } from '../../utils/animations'
import { withApollo } from '../../lib/apollo'
import {
  PostSnippetFragment,
  UserPostsQuery,
  useUserPostsQuery,
  useUserQuery,
} from '../../generated/graphql'
import { Avatar } from '../../components/Avatar'
import { Loader } from '../../components/Loader'
import { PostList } from '../../components/PostList'
import { ApolloQueryResult } from '@apollo/client'

interface userProps {}

const user: NextPage<userProps> = ({}) => {
  const [posts, setPost] = useState<PostSnippetFragment[]>([])
  const [hasMore, setHasMore] = useState(true)

  const router = useRouter()

  const id = router.query.id as string

  const { data: userData, loading: userLoading } = useUserQuery({
    variables: { userId: id },
    errorPolicy: 'all',
  })

  const {
    data: postsData,
    loading: postsLoading,
    fetchMore,
  } = useUserPostsQuery({
    variables: { userId: id, skip: 0, take: 8 },
  })

  useEffect(() => {
    setPost(postsData?.posts!)

    if (
      postsData &&
      (postsData.posts.length % 2 !== 0 || postsData.posts.length < 8)
    ) {
      setHasMore(false)
    }
  }, [postsData])

  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={variants}
    >
      <Layout>
        <Meta
          title='GraphQL Prisma 2 | Profile'
          description='here you can find all your posts, including private ones'
        />
        {userLoading ? (
          <Loader />
        ) : !userData || !userData.user ? (
          null
        ) : (
          <div className='md:flex md:w-1/2 mx-auto'>
            <Avatar user={userData?.user!} height={120} />
            <div className='flex md:w-9/12'>
              <h2 className='mt-3 md:mt-0 self-end text-4xl mx-auto md:mx-0 font-black'>
                {userData.user?.name}
              </h2>
            </div>
          </div>
        )}
        {!posts && !postsLoading ? (
          <div className='mb-8 text-center text-lg font-semibold'>no posts</div>
        ) : !posts ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <PostList posts={posts} />
            {postsLoading && <Loader />}
            {hasMore ? (
              <button
                className='flex mt-8 mx-auto py-2 px-4 rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 focus:outline-none hover:text-white mb-8'
                onClick={async () => {
                  const response: ApolloQueryResult<UserPostsQuery> = await fetchMore(
                    {
                      variables: {
                        skip: posts.length,
                        take: 4,
                      },
                    }
                  )

                  if (
                    response.data === null ||
                    response.data.posts?.length! < 4
                  ) {
                    setHasMore(false)
                  }

                  if (response.errors) {
                    if (
                      response.errors[0].message === 'Could not find any posts.'
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
      </Layout>
    </motion.div>
  )
}

export default withApollo({ ssr: true })(user)
