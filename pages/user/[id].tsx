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
  useFollowMutation,
  useUnfollowMutation,
  useMeQuery,
} from '../../generated/graphql'
import { Avatar } from '../../components/Avatar'
import { Loader } from '../../components/Loader'
import { PostList } from '../../components/PostList'
import { ApolloQueryResult } from '@apollo/client'
import { isServer } from '../../utils/isServer'

interface userProps {}

const user: NextPage<userProps> = ({}) => {
  const [posts, setPost] = useState<PostSnippetFragment[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [unfollowButton, setUnfollowButton] = useState('following')

  const router = useRouter()

  const id = router.query.id as string

  const { data: meData } = useMeQuery({ errorPolicy: 'all', skip: isServer() })

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

  const [follow] = useFollowMutation({ errorPolicy: 'all' })
  const [unfollow] = useUnfollowMutation({ errorPolicy: 'all' })

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
          title={userData?.user?.name ? userData.user.name : 'GraphQL Prisma 2'}
          description={
            userData?.user?.name
              ? `${userData.user.name} profile and all public posts`
              : 'user profile and public posts'
          }
        />
        {userLoading ? (
          <Loader />
        ) : !userData || !userData.user ? null : (
          <div className='md:flex md:w-1/2 xl:w-1/4 mx-auto'>
            <Avatar user={userData?.user!} height={120} />
            <div className='md:w-9/12'>
              <h2 className='mt-3 md:mt-0 text-4xl text-center md:text-left mx-auto md:mx-0 font-black'>
                {userData.user?.name}
              </h2>
              <div className='flex justify-center md:justify-start mt-2'>
                <h4 className='mr-6 text-lg'>
                  <strong>{userData.user.followingCount}</strong> following
                </h4>
                <h4 className='text-lg'>
                  <strong>{userData.user.followersCount}</strong> followers
                </h4>
                {userData.user.followsMe ? (
                  <h4 className='ml-5 p-1 rounded-md font-medium bg-gray-200 text-gray-500'>
                    Follows you
                  </h4>
                ) : null}
              </div>
              {!meData?.me ? null : userData.user.IFollow ? (
                <div className='flex'>
                  <button
                    type='button'
                    className='h-10 mt-1 mx-auto md:mx-0 px-2 font-bold tracking-widest rounded-md hover:bg-red-500 bg-pink-400 text-white focus:outline-none'
                    onMouseOver={() => setUnfollowButton('unfollow')}
                    onMouseOut={() => setUnfollowButton('following')}
                    onClick={async () => {
                      await unfollow({
                        variables: { userId: id },
                        update: (cache) => {
                          cache.modify({
                            id: 'User:' + id,
                            fields: {
                              IFollow() {
                                return false
                              },
                              followersCount() {
                                return userData.user?.followersCount! - 1
                              },
                            },
                          })
                        },
                      })
                    }}
                  >
                    {unfollowButton}
                  </button>
                </div>
              ) : (
                <div className='flex'>
                  <button
                    type='button'
                    className='box-border mx-auto md:mx-0 h-10 mt-1 place-self-center px-2 font-bold tracking-widest rounded-md border-2 text-pink-500 border-pink-400 hover:bg-pink-400 hover:text-white  focus:outline-none'
                    onClick={async () => {
                      await follow({
                        variables: { userId: id },
                        update: (cache) => {
                          cache.modify({
                            id: 'User:' + id,
                            fields: {
                              IFollow() {
                                return true
                              },
                              followersCount() {
                                return userData.user?.followersCount! + 1
                              },
                            },
                          })
                        },
                      })
                    }}
                  >
                    follow
                  </button>
                </div>
              )}
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
