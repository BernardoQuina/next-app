import { NextPage } from 'next'

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
      {!data || loading ? (
        <div>loading...</div>
      ) : (
        <PostList posts={data.posts} />
      )}
    </div>
  )
}

export default withApollo({ ssr: true })(Home)
