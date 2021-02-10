import { NextPage } from 'next'

import withApollo from '../lib/apollo'
import PostList from '../components/PostList'
import Header from '../components/Header'
import { useGetAllPostsQuery } from '../generated/graphql'

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const { data, loading } = useGetAllPostsQuery()

  if (loading || !data) {
    return <span>loading...</span>
  }

  return (
    <div>
      <Header />
      <PostList posts={data.posts} />
    </div>
  )
}

export default withApollo({ ssr: true })(Home)
