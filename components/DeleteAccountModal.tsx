import React, { Dispatch, SetStateAction } from 'react'
import { Formik, Form } from 'formik'
import { motion, AnimatePresence } from 'framer-motion'

import { NewInputField } from './NewInputField'
import { X } from './svg/X'
import { useDeleteUserMutation, useMeQuery } from '../generated/graphql'
import { backdrop, scaleUp } from '../utils/animations'
import { isServer } from '../utils/isServer'
import { useRouter } from 'next/router'
import { Spinner } from './svg/Spinner'

interface DeleteAccountModalProps {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  setShowModal,
  showModal,
}) => {
  const router = useRouter()

  const { data } = useMeQuery({ errorPolicy: 'all', skip: isServer() })

  const [deleteUser, { loading }] = useDeleteUserMutation({
    errorPolicy: 'all',
  })

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
              password: '',
            }}
            onSubmit={async ({ password }, { setErrors }) => {
              const response = await deleteUser({
                variables: {
                  password,
                },
                update: (cache) => {
                  cache.evict({ fieldName: 'me' })
                },
              })

              if (response.errors) {
                // backend doesn't specify the field error so all errors go to first field
                return setErrors({ password: response.errors[0].message })
              } else if (response.data?.deleteUser) {
                router.push('/register')
              }

              setShowModal(false)
            }}
          >
            {({ isSubmitting }) => (
              <motion.div variants={scaleUp}>
                <Form className='max-w-md sm:mx-auto mx-4 my-32 pb-6 rounded-lg shadow-xl bg-white'>
                  <button
                    type='button'
                    onClick={() => setShowModal(false)}
                    className='focus:outline-none'
                  >
                    <X tailwind='h-6 mt-2 ml-4 text-pink-600 transform hover:scale-125' />
                  </button>
                  <div className='border-t-2 mb-8'>
                    <div className='w-full'>
                      <p className='my-4 mx-2 text-lg p-4 text-center rounded-md '>
                        Are you sure you want to delete your account?
                      </p>
                      <NewInputField
                        inputStyling='w-11/12 my-5 px-2 border-b text-xl focus:outline-none'
                        name='password'
                        placeholder='Password'
                        label='Password'
                        showLabel={false}
                        type='password'
                        hidden={
                          data?.me?.facebookId || data?.me?.googleId
                            ? true
                            : false
                        }
                      />
                    </div>
                  </div>
                  <button
                    className='flex self-center mx-auto py-2 px-4 text-white bg-red-600 focus:outline-none rounded-md transform hover:scale-105 active:scale-90'
                    type='submit'
                  >
                    {isSubmitting || loading ? (
                      <Spinner tailwind='h-6 animate-spin' strokeWidth={2} />
                    ) : (
                      'delete'
                    )}
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
