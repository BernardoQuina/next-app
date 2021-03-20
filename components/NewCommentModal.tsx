import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import { motion, AnimatePresence } from 'framer-motion'

import {
  useMeQuery,
  useNewCommentMutation,
  useSinglePostQuery,
} from '../generated/graphql'
import { useIsAuth } from '../utils/useIsAuth'
import { NewInputField } from './NewInputField'
import { backdrop, scaleUp } from '../utils/animations'
import { X } from './svg/X'
import { Avatar } from './Avatar'
import { isServer } from '../utils/isServer'

interface NewCommentModalProps {
  postId: string
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const NewCommentModal: React.FC<NewCommentModalProps> = ({
  showModal,
  setShowModal,
  postId,
}) => {
  const router = useRouter()

  const { data } = useMeQuery({ errorPolicy: 'all', skip: isServer() })

  const [newComment] = useNewCommentMutation({ errorPolicy: 'all' })

  const { fetchMore } = useSinglePostQuery({
    variables: { postId },
  })

  useIsAuth(showModal)

  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          // onClick={(e) => e.preventDefault()}
          className='fixed cursor-default overflow-y-scroll top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'
          initial='initial'
          animate='animate'
          exit='exit'
          variants={backdrop}
        >
          <Formik
            initialValues={{
              text: '',
            }}
            onSubmit={async ({ text }, { setErrors }) => {
              const response = await newComment({
                variables: { postId, text },
              })

              if (response.errors) {
                setErrors({ text: response.errors[0].message })
              } else {
                fetchMore({ variables: { postId } })
                setShowModal(false)
                if (router.pathname === '/') {
                  router.push(`/post/${postId}`)
                }
              }
            }}
          >
            {({ values }) => (
              <motion.div variants={scaleUp}>
                <Form className='max-w-2xl sm:mx-auto mx-4 my-20 pb-6 rounded-lg shadow-xl bg-white'>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.preventDefault()
                      setShowModal(false)
                    }}
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
                        inputStyling='w-11/12 my-6 px-2 border-b text-lg text-black focus:outline-none'
                        name='text'
                        placeholder='Your reply'
                        label='Text'
                        showLabel={false}
                        textarea={true}
                        type='text'
                        maxLength={100}
                      />
                      <div></div>
                    </div>
                  </div>
                  <button
                    className='flex self-center mx-auto py-2 px-4 text-white bg-pink-600 focus:outline-none rounded-md transform hover:scale-105 active:scale-90 disabled:opacity-70'
                    type='submit'
                    disabled={values.text.length < 1}
                  >
                    comment
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
