import { NextPage } from 'next'
import { gql, useQuery } from '@apollo/client'

import withApollo from '../lib/apollo'
// import { initializeApollo } from '../apollo'
import PostList from '../components/PostList'

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const {data, loading} = useQuery(PostsQuery)

  // console.log('data: ', data)

  if (loading) return <span>loading...</span>

  return (
    <div>
      <PostList posts={data.posts} />
    </div>
  )
}

const PostsQuery = gql`
  query PostsQuery {
    posts {
      id
      title
      body
      published
      createdAt
      updatedAt
      author {
        name
      }
    }
  }
`



// export const getServerSideProps: GetServerSideProps = async (context) => {

//   console.log(context)

//   const apolloClient = initializeApollo()

//   await apolloClient.query({
//     query: PostsQuery,
//   })

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   }
// }

export default withApollo({ssr: true})(Home)
