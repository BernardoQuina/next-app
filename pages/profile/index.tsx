import { ApolloQueryResult } from '@apollo/client'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { Layout } from '../../components/Layout'
import { PostList } from '../../components/PostList'
import { Header } from '../../components/Header'
import { Meta } from '../../components/Meta'

import {
  MyPostsQuery,
  PostSnippetFragment,
  useMeQuery,
  useMyPostsQuery,
} from '../../generated/graphql'
import { withApollo } from '../../lib/apollo'
import { useIsAuth } from '../../utils/useIsAuth'
import UserCard from '../../components/UserCard'

interface profileProps {}

const profile: NextPage<profileProps> = () => {
  const [hasMore, setHasMore] = useState(true)

  useIsAuth()

  const { data: userData } = useMeQuery()

  const { data, loading, fetchMore } = useMyPostsQuery({
    variables: { skip: 0, take: 8 },
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  })

  useEffect(() => {
    if (data && (data.myPosts.length % 2 !== 0 || data.myPosts.length < 8)) {
      setHasMore(false)
    }
  }, [data])

  return (
    <Layout>
      <Meta
        title='GraphQL Prisma 2 | Profile'
        description='here you can find all your posts, including private ones'
      />
      <Header
        title='User profile'
        body='Find your profile details & your posts here'
      />
      <UserCard
        userName={userData?.me?.name!}
        userEmail={userData?.me?.email!}
        userPhoto={userData?.me?.photo ? userData.me.photo : undefined}
      />
      {loading ? (
        <div>loading...</div>
      ) : !data ? (
        <div className='mb-8 text-center text-lg font-semibold'>no posts</div>
      ) : (
        <>
          <PostList posts={data.myPosts as PostSnippetFragment[]} />
          {hasMore ? (
            <button
              className='flex mt-8 mx-auto py-2 px-4 rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900 mb-8'
              onClick={async () => {
                const response: ApolloQueryResult<MyPostsQuery> = await fetchMore(
                  {
                    variables: {
                      skip: data?.myPosts?.length,
                      take: 4,
                    },
                  }
                )

                if (
                  response.data === null ||
                  response.data.myPosts?.length! < 4
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
  )
}

export default withApollo({ ssr: false })(profile)
