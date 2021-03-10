import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import { motion, AnimatePresence } from 'framer-motion'

import { useNewPostMutation } from '../generated/graphql'
import { useIsAuth } from '../utils/useIsAuth'
import { InputField } from './InputField'
import { backdrop, scaleUp } from '../utils/animations'

interface NewPostModalProps {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const NewPostModal: React.FC<NewPostModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const router = useRouter()

  const [newPost] = useNewPostMutation()

  useIsAuth(showModal)

  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'
          initial='initial'
          animate='animate'
          exit='exit'
          variants={backdrop}
        >
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
                  cache.evict({ fieldName: 'myPosts' })
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
              <motion.div variants={scaleUp}>
                <Form className='max-w-lg sm:mx-auto mx-4 my-20 pb-6 rounded-lg shadow-xl bg-white'>
                  <button
                    type='button'
                    onClick={() => setShowModal(false)}
                    className='focus:outline-none'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      className='fixed h-6 ml-4 text-pink-600 transform hover:scale-125'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                  <h2 className='text-center text-2xl font-extrabold text-pink-600'>
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
              </motion.div>
            )}
          </Formik>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
