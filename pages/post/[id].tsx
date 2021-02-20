import { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'

import { withApollo } from '../../lib/apollo'
import { Meta } from '../../components/Meta'
import {
  SingleCommentQuery,
  SingleCommentDocument,
  useNewCommentMutation,
  useSinglePostQuery,
} from '../../generated/graphql'
import { Layout } from '../../components/Layout'
import { styles } from '../../tailwind/styles'
import { DeletePostButton } from '../../components/DeletePostButton'
import { EditPostButton } from '../../components/EditPostButton'
import { CommentList } from '../../components/CommentList'
import { InputField } from '../../components/InputField'

interface PostProps {}

const Post: NextPage<PostProps> = () => {
  const [commenting, setCommenting] = useState(false)

  const router = useRouter()

  const id = router.query.id as string

  const { data, loading, error, fetchMore } = useSinglePostQuery({
    variables: { postId: id },
  })

  if (commenting) {
    fetchMore({ variables: { postId: id } })
  }

  const [newComment] = useNewCommentMutation()

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
        <Formik
          initialValues={{
            text: '',
          }}
          onSubmit={async ({ text }, { setErrors }) => {
            setCommenting(true)
            const response = await newComment({
              variables: { postId: id, text },
              update: (cache, { data }) => {
                cache.writeQuery<SingleCommentQuery>({
                  query: SingleCommentDocument,
                  variables: { commentId: data?.createComment?.id },
                  data: {
                    __typename: 'Query',
                    comment: data?.createComment,
                  },
                })
              },
            })

            if (response.errors) {
              console.log(response.errors)
              setErrors({ text: response.errors[0].message })
            }
            setCommenting(false)
          }}
        >
          {() => (
            <Form className='md:flex max-w-lg border hover:border-pink-600 shadow-md rounded-lg my-5'>
              <InputField name='text' placeholder='comment...' type='text' />

              {commenting ? (
                <button className='self-center mx-28 mb-4 md:mx-auto md:mb-0 py-2 px-4 focus:bg-pink-600 focus:text-white focus:outline-none rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900'>
                  loading
                </button>
              ) : (
                <button
                  className='self-center mx-28 mb-4 md:mx-auto md:mb-0 py-2 px-4 focus:bg-pink-600 focus:text-white focus:outline-none rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900'
                  type='submit'
                >
                  comment
                </button>
              )}
            </Form>
          )}
        </Formik>
        {data.post?.comments.length ? (
          <CommentList comments={data.post.comments} />
        ) : (
          <br />
        )}

        <button className={styles.button + ' mb-8'} onClick={() => router.back()}>
          Go Back
        </button>
      </div>
    </Layout>
  )
}

export default withApollo({ ssr: true })(Post)
