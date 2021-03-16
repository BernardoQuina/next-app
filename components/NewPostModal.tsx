import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import { motion, AnimatePresence } from 'framer-motion'

import { useMeQuery, useNewPostMutation } from '../generated/graphql'
import { useIsAuth } from '../utils/useIsAuth'
import { NewInputField } from './NewInputField'
import { backdrop, scaleUp } from '../utils/animations'
import { ImageUpload } from './ImageUpload'
import { X } from './svg/X'
import { Avatar } from './Avatar'
import { isServer } from '../utils/isServer'

interface NewPostModalProps {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const NewPostModal: React.FC<NewPostModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const router = useRouter()

  const { data } = useMeQuery({ errorPolicy: 'all', skip: isServer() })

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
            {({ initialValues, values }) => (
              <motion.div variants={scaleUp}>
                <Form className='max-w-2xl sm:mx-auto mx-4 my-20 pb-6 rounded-lg shadow-xl bg-white'>
                  <button
                    type='button'
                    onClick={() => setShowModal(false)}
                    className='focus:outline-none'
                  >
                    <X tailwind='h-6 mt-2 ml-4 text-pink-600 transform hover:scale-125' />
                  </button>
                  <div className='flex border-t-2 mb-8'>
                    <div className='m-2'>
                      {data && data.me ? (
                        <Avatar user={data?.me!} height={50} />
                      ) : null}
                    </div>
                    <div className='w-full'>
                      <NewInputField
                        inputStyling='w-11/12 px-2 border-b text-xl focus:outline-none'
                        name='title'
                        placeholder='Title'
                        label='Title'
                        showLabel={false}
                        type='text'
                        maxLength={50}
                      />
                      <NewInputField
                        inputStyling='w-11/12 px-2 text-lg border-b focus:outline-none'
                        name='body'
                        placeholder='Whats happening?'
                        label='Body'
                        showLabel={false}
                        type='text'
                        textarea={true}
                        maxLength={240}
                      />
                      <div>
                        <NewInputField
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
                      <ImageUpload
                        uploadedImages={uploadedImages}
                        setUploadedImages={setUploadedImages}
                      />
                    </div>
                  </div>
                  <button
                    className='flex self-center mx-auto py-2 px-4 text-white bg-pink-600 focus:outline-none rounded-md transform hover:scale-105 active:scale-90 disabled:opacity-70'
                    type='submit'
                    disabled={values.title.length < 1}
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
