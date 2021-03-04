import { NextPage } from 'next'
import { useRouter } from 'next/router'
import moment from 'moment'

import { withApollo } from '../../lib/apollo'
import { Meta } from '../../components/Meta'
import { useSinglePostQuery } from '../../generated/graphql'
import { Layout } from '../../components/Layout'
import { DeletePostButton } from '../../components/DeletePostButton'
import { EditPostButton } from '../../components/EditPostButton'
import { CommentList } from '../../components/CommentList'
import { NewCommentForm } from '../../components/NewCommentForm'

interface PostProps {}

const Post: NextPage<PostProps> = () => {
  const router = useRouter()

  const id = router.query.id as string

  const { data, loading, error } = useSinglePostQuery({
    variables: { postId: id },
  })

  if (error) {
    return <div>{error.message}</div>
  }

  if (loading || !data) return <span>loading...</span>

  return (
    <Layout>
      <div className='block max-w-lg m-auto'>
        <Meta
          title={data?.post?.title as string}
          description={data?.post?.body as string}
        />
        <div className='mt-10 px-6 pt-6 pb-6 border shadow-inner rounded-lg'>
          <div className='mb-7 items-baseline'>
            {data?.post?.published === false && (
              <p className='max-w-min text-sm font-bold text-pink-600 rounded-md ml-auto px-2 py-1 bg-pink-200 mb-2'>
                private
              </p>
            )}
            <h1 className='text-2xl md:text-3xl font-bold'>
              {data?.post?.title}
            </h1>
            <div className='md:flex text-gray-400'>
              <div className='flex'>
                <p>posted by</p>
                <p className='ml-2 mr-2 font-semibold'>
                  {data?.post?.author?.name}
                </p>
              </div>
              <p className='hidden md:inline-block'>|</p>
              <p className='md:ml-2'>{moment(data.post?.createdAt).fromNow()}</p>
            </div>
          </div>
          <p>{data?.post?.body}</p>
          <div className='flex mt-6'>
            <DeletePostButton postId={id} authorId={data.post?.author?.id!} />
            <EditPostButton authorId={data.post?.author?.id!} postId={id} />
          </div>
        </div>
        <NewCommentForm postId={id} />
        {data.post?.comments.length ? (
          <CommentList comments={data.post.comments} />
        ) : (
          <br />
        )}

        <button
          className='flex mt-8 mx-auto py-2 px-4 rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900 mb-8'
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    </Layout>
  )
}

export default withApollo({ ssr: true })(Post)
