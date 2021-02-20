import { ApolloQueryResult } from '@apollo/client'
import { NextPage } from 'next'
import { useState } from 'react'

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
import { styles } from '../../tailwind/styles'
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
      />
      {loading ? (
        <div>loading...</div>
      ) : !data ? (
        <div className='mb-8 text-center text-lg font-semibold'>
              no posts
            </div>
      ) : (
        <>
          <PostList posts={data.myPosts as PostSnippetFragment[]} />
          {hasMore ? (
            <button
              className={styles.button + 'mb-8'}
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
            <div className='mb-8 text-center text-lg font-semibold'>
              no more posts
            </div>
          )}
        </>
      )}
    </Layout>
  )
}

export default withApollo({ ssr: false })(profile)
