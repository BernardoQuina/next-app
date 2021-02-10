import { gql, useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import { initializeApollo } from '../../../apollo'

import withApollo from '../../../lib/apollo'
import Meta from '../../../components/Meta'

interface PostProps {}

const post: NextPage<PostProps> = () => {
  const router = useRouter()

  const id = router.query.id

  const query = useQuery(PostQuery, {
    variables: { postId: id },
  })

  const { data, loading } = query

  if (loading || !post) return <span>loading...</span>

  return (
    <>
      <Meta title={data.post.title} description={data.post.body} />
      <div className='mt-10 px-10 pt-8 pb-20 border border-pink-600 rounded-lg'>
        <div className='sm:flex mb-7 items-baseline'>
          <h1 className='text-3xl mr-5 font-bold'>{data.post.title}</h1>
          <p className='text-gray-400'>posted by {data.post.author.name}</p>
        </div>
        <p>{data.post.body}</p>
      </div>
      <br />
      <Link href='/'>
        <a className='inline py-2 px-4 rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white   active:bg-pink-900 active:border-pink-900'>
          Go Back
        </a>
      </Link>
    </>
  )
}

const PostQuery = gql`
  query($postId: String!) {
    post(where: { id: $postId }) {
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

// export const getStaticProps: GetStaticProps = async (context) => {
//   return {
//     props: {
//       id: context.params?.id,
//     },
//   }
// }

export default withApollo({ ssr: true })(post)
