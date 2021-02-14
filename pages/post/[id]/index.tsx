import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import { initializeApollo } from '../../../apollo'

import { withApollo } from '../../../lib/apollo'
import { Meta } from '../../../components/Meta'
import { useSinglePostQueryQuery } from '../../../generated/graphql'

interface PostProps {}

const Post: NextPage<PostProps> = () => {
  const router = useRouter()

  const id = router.query.id as string

  const { data, loading } = useSinglePostQueryQuery({
    variables: { postId: id },
  })

  if (loading || !data) return <span>loading...</span>

  return (
    <div className='block'>
      <Meta
        title={data?.post?.title as string}
        description={data?.post?.body as string}
      />
      <div className='mt-10 px-10 pt-8 pb-20 border border-pink-600 rounded-lg'>
        <div className='sm:flex mb-7 items-baseline'>
          <h1 className='text-3xl mr-5 font-bold'>{data?.post?.title}</h1>
          <p className='text-gray-400'>posted by {data?.post?.author?.name}</p>
        </div>
        <p>{data?.post?.body}</p>
      </div>
      <br />
      <Link href='/'>
        <a className='inline py-2 px-4 rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white   active:bg-pink-900 active:border-pink-900'>
          Go Back
        </a>
      </Link>
    </div>
  )
}

export default withApollo({ ssr: true })(Post)
