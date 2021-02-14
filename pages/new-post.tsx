import { NextPage } from 'next'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'

import { useNewPostMutation } from '../generated/graphql'
import { withApollo } from '../lib/apollo'
import { useIsAuth } from '../utils/useIsAuth'
import { InputField } from '../components/InputField'
import { Layout } from '../components/Layout'

interface newPostProps {}

const newPost: NextPage<newPostProps> = ({}) => {
  const router = useRouter()
  useIsAuth()

  const [newPost] = useNewPostMutation()

  return (
    <Layout>
      <Formik
        initialValues={{
          title: '',
          body: '',
          published: true,
        }}
        onSubmit={async ({ title, body, published }, { setErrors }) => {
          const response = await newPost({
            variables: { title, body, published },
            update: (cache) => {
              cache.evict({ fieldName: 'posts' })
            },
          })

          if (response.errors) {
            console.log(response.errors)
            // backend doesn't specify the field error so all errors go to "name"
            setErrors({ title: response.errors[0].message })
          } else if (response.data?.createPost) {
            router.push(`/post/${response.data.createPost.id}`)
          }
        }}
      >
        {({ initialValues }) => (
          <Form className='max-w-lg mx-auto border hover:border-pink-600 shadow-xl rounded-lg mb-10 pb-6'>
            <h2 className='my-6 text-center text-2xl font-extrabold text-pink-600'>
              What's on your mind?
            </h2>
            <InputField
              name='title'
              placeholder='Post title'
              label='Title'
              type='text'
            />
            <InputField
              name='body'
              placeholder='post body'
              label='Body'
              type='text'
            />
            <div>
              <InputField
                name='published'
                label='public'
                type='checkbox'
                onClick={() =>
                  initialValues.published
                    ? (initialValues.published = false)
                    : (initialValues.published = true)
                }
              />
            </div>

            <button
              className='flex self-center mx-auto py-2 px-4 focus:bg-pink-600 focus:text-white focus:outline-none rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900'
              type='submit'
            >
              post
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withApollo({ ssr: false })(newPost)
