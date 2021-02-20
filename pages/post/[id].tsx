import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { withApollo } from '../../lib/apollo'
import { Meta } from '../../components/Meta'
import { useSinglePostQueryQuery } from '../../generated/graphql'
import { Layout } from '../../components/Layout'
import { styles } from '../../tailwind/styles'
import { DeletePostButton } from '../../components/DeletePostButton'
import { EditPostButton } from '../../components/EditPostButton'

interface PostProps {}

const Post: NextPage<PostProps> = () => {
  const router = useRouter()

  const id = router.query.id as string

  const { data, loading, error } = useSinglePostQueryQuery({
    variables: { postId: id },
  })

  if (error) {
    return <div>{error.message}</div>
  }

  if (loading || !data) return <span>loading...</span>

  console.log('comments: ', data.post?.comments)

  if (data.post?.comments.length) {
    console.log('hey')
  } else {
    console.log('nay')
  }

  return (
    <Layout>
      <div className='block max-w-lg m-auto'>
        <Meta
          title={data?.post?.title as string}
          description={data?.post?.body as string}
        />
        <div className='mt-10 px-6 pt-6 pb-6 border border-pink-600 rounded-lg'>
          <div className='mb-7 items-baseline'>
            {data?.post?.published === false && (
              <p className={styles.flag + ' mb-2'}>private</p>
            )}
            <h1 className='text-2xl md:text-3xl font-bold'>
              {data?.post?.title}
            </h1>
            <p className='text-gray-400'>
              posted by {data?.post?.author?.name}
            </p>
          </div>
          <p>{data?.post?.body}</p>
          <div className='flex mt-6'>
            <DeletePostButton postId={id} authorId={data.post?.author?.id!} />
            <EditPostButton authorId={data.post?.author?.id!} postId={id} />
          </div>
        </div>
        {data.post?.comments.length ? (
          <div className='ml-6 divide-y divide-pink-400'>
            {data.post.comments.map((comment) => (
              <div className='py-5'>
                <div className='text-lg font-semibold'>
                  {comment.author?.name}
                </div>
                <div className='ml-4 mt-2'>{comment.text}</div>
              </div>
            ))}
          </div>
        ) : (
          <br />
        )}

        <button className={styles.button} onClick={() => router.back()}>
          Go Back
        </button>
      </div>
    </Layout>
  )
}

export default withApollo({ ssr: true })(Post)
