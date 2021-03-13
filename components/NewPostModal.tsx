import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import { motion, AnimatePresence } from 'framer-motion'

import { useNewPostMutation } from '../generated/graphql'
import { useIsAuth } from '../utils/useIsAuth'
import { InputField } from './InputField'
import { backdrop, scaleUp } from '../utils/animations'
import { ImageUpload } from './ImageUpload'
import { X } from './svg/X'

interface NewPostModalProps {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const NewPostModal: React.FC<NewPostModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const router = useRouter()

  const [newPost] = useNewPostMutation({ errorPolicy: 'all' })

  const [uploadedImages, setUploadedImages] = useState<{ public_id: string }[]>(
    []
  )

  useIsAuth(showModal)

  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          className='fixed overflow-y-scroll top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10'
          initial='initial'
          animate='animate'
          exit='exit'
          variants={backdrop}
        >
          <Formik
            initialValues={{
              title: '',
              body: '',
              images: [''],
              published: true,
            }}
            onSubmit={async (
              { title, body, images, published },
              { setErrors }
            ) => {
              images = uploadedImages.map((images) => images.public_id)
              const response = await newPost({
                variables: { title, body, published, images },
                update: (cache) => {
                  cache.evict({ fieldName: 'posts' })
                  cache.evict({ fieldName: 'myPosts' })
                },
              })

              if (response.errors) {
                // backend doesn't specify the field error so all errors go to "title"
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
                    <X tailwind='absolute h-6 ml-4 text-pink-600 transform hover:scale-125' />
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
                  <ImageUpload
                    uploadedImages={uploadedImages}
                    setUploadedImages={setUploadedImages}
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
