import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import { initializeApollo } from '../../../apollo'

import { withApollo } from '../../../lib/apollo'
import { Meta } from '../../../components/Meta'
import { useSinglePostQueryQuery } from '../../../generated/graphql'
import { Layout } from '../../../components/Layout'
import { styles } from '../../../tailwind/styles'

interface PostProps {}

const Post: NextPage<PostProps> = () => {
  const router = useRouter()

  const id = router.query.id as string

  const { data, loading } = useSinglePostQueryQuery({
    variables: { postId: id },
  })

  if (loading || !data) return <span>loading...</span>

  return (
    <Layout>
      <div className='block max-w-lg mx-auto'>
        <Meta
          title={data?.post?.title as string}
          description={data?.post?.body as string}
        />
        <div className='mt-10 px-10 pt-8 pb-20 border border-pink-600 rounded-lg'>
          <div className='sm:flex mb-7 items-baseline'>
            <h1 className='text-3xl mr-5 font-bold'>{data?.post?.title}</h1>
            <p className='text-gray-400'>
              posted by {data?.post?.author?.name}
            </p>
          </div>
          <p>{data?.post?.body}</p>
        </div>
        <br />
        <Link href='/'>
          <button className={styles.button}>
            Go Back
          </button>
        </Link>
      </div>
    </Layout>
  )
}

export default withApollo({ ssr: true })(Post)
