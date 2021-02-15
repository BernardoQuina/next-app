import { ApolloQueryResult } from '@apollo/client'
import { NextPage } from 'next'
import { useState } from 'react'
import { Layout } from '../components/Layout'
import { PostList } from '../components/PostList'
import {
  MyPostsQuery,
  PostSnippetFragment,
  useMyPostsQuery,
} from '../generated/graphql'
import { withApollo } from '../lib/apollo'
import { styles } from '../tailwind/styles'

interface profileProps {}

const profile: NextPage<profileProps> = () => {
  const [hasMore, setHasMore] = useState(true)

  const { data, loading, error, fetchMore } = useMyPostsQuery({
    variables: { skip: 0, take: 8 },
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  })

  if (!loading && !data) {
    return (
      <div>
        <p>your query failed...</p>
        <p>{error?.message}</p>
      </div>
    )
  }

  return (
    <Layout>
      <div>User profile</div>
      <div>All user posts</div>
      {!data || loading ? (
        <div>loading...</div>
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

                if (response.data.myPosts?.length! < 4) {
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
