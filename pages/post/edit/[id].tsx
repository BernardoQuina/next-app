import { NextPage } from 'next'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'

import { Layout } from '../../../components/Layout'
import { InputField } from '../../../components/InputField'
import {
  useSinglePostQueryQuery,
  useEditPostMutation,
} from '../../../generated/graphql'
import { withApollo } from '../../../lib/apollo'

interface EditPostProps {}

const EditPost: NextPage<EditPostProps> = ({}) => {
  const router = useRouter()

  const id = router.query.id as string

  const { data, loading, error } = useSinglePostQueryQuery({
    variables: { postId: id },
  })

  const [editPost] = useEditPostMutation()

  if (error) {
    return <div>{error.message}</div>
  }

  if (loading) return <span>loading...</span>

  if (!data?.post) {
    return <span>loading...</span>
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          updateTitle: data.post.title,
          updateBody: data.post.body,
          updatePublished: data.post.published!,
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await editPost({
            variables: { postId: id, ...values },
            update: (cache) => {
              cache.evict({ fieldName: 'posts' })
            },
          })

          if (response.errors) {
            console.log(response.errors)
            // backend doesn't specify the field error so all errors go to "title"
            setErrors({ updateTitle: response.errors[0].message })
          } else if (response.data?.updatePost) {
            router.push(`/post/${response.data.updatePost.id}`)
          }
        }}
      >
        {({ initialValues }) => (
          <Form className='max-w-lg mx-auto border hover:border-pink-600 shadow-xl rounded-lg mb-10 pb-6'>
            <h2 className='my-6 text-center text-2xl font-extrabold text-pink-600'>
              What's to change?
            </h2>
            <InputField
              name='updateTitle'
              placeholder='Post title'
              label='Title'
              type='text'
            />
            <InputField
              name='updateBody'
              placeholder='post body'
              label='Body'
              type='text'
            />
            <div>
              <InputField
                name='updatePublished'
                label='public'
                type='checkbox'
                onClick={() =>
                  initialValues.updatePublished
                    ? (initialValues.updatePublished = false)
                    : (initialValues.updatePublished = true)
                }
              />
            </div>

            <button
              className='flex self-center mx-auto py-2 px-4 focus:bg-pink-600 focus:text-white focus:outline-none rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900'
              type='submit'
            >
              edit
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withApollo({ ssr: false })(EditPost)
