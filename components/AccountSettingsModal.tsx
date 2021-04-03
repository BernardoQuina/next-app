import React, { Dispatch, SetStateAction, useState } from 'react'
import { Formik, Form } from 'formik'
import { motion, AnimatePresence } from 'framer-motion'

import { NewInputField } from './NewInputField'
import { X } from './svg/X'
import {
  MeDocument,
  MeQuery,
  useEditUserMutation,
  useMeQuery,
} from '../generated/graphql'
import { backdrop, scaleUp } from '../utils/animations'
import { isServer } from '../utils/isServer'
import { DeleteAccountModal } from './DeleteAccountModal'

interface AccountSettingsModalProps {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({
  setShowModal,
  showModal,
}) => {
  const [deleteModal, setDeleteModal] = useState(false)

  const { data } = useMeQuery({ errorPolicy: 'all', skip: isServer() })

  const [editUser] = useEditUserMutation({ errorPolicy: 'all' })

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
          {deleteModal ? (
            <DeleteAccountModal
              setShowModal={setDeleteModal}
              showModal={deleteModal}
            />
          ) : null}
          <Formik
            initialValues={{
              password: '',
              updateEmail: data?.me?.email!,
              updatePassword: '',
              confirmNewPassword: '',
            }}
            onSubmit={async (
              { password, updateEmail, updatePassword, confirmNewPassword },
              { setErrors }
            ) => {
              const response = await editUser({
                variables: {
                  password,
                  updateEmail,
                  updatePassword,
                  confirmNewPassword,
                },
                update: (cache, { data }) => {
                  if (data?.updateUser !== null) {
                    cache.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        __typename: 'Query',
                        me: data?.updateUser,
                      },
                    })
                  }
                },
              })

              if (response.errors) {
                // backend doesn't specify the field error so all errors go to first field
                return setErrors({ password: response.errors[0].message })
              }

              setShowModal(false)
            }}
          >
            {() => (
              <motion.div variants={scaleUp}>
                <Form className='max-w-xl sm:mx-auto mx-4 my-20 pb-6 rounded-lg shadow-xl bg-white'>
                  <div className='flex'>
                    <button
                      type='button'
                      onClick={() => setShowModal(false)}
                      className='focus:outline-none'
                    >
                      <X tailwind='h-6 mt-2 ml-4 text-pink-600 transform hover:scale-125' />
                    </button>
                    <button
                      className='ml-auto mr-1 my-1 py-1 px-2 text-white bg-red-500 hover:bg-red-600 focus:outline-none rounded-md transform hover:scale-105 active:scale-90 disabled:opacity-70'
                      type='button'
                      onClick={() => setDeleteModal(true)}
                    >
                      delete account
                    </button>
                  </div>
                  <div className='border-t-2 mb-8'>
                    <div className='w-full'>
                      {data?.me?.facebookId || data?.me?.googleId ? (
                        <p className='my-4 mx-2 text-lg p-4 text-center rounded-md bg-pink-200'>
                          Since your account is associated with google or
                          facebook, you can't edit it, only delete it.
                        </p>
                      ) : null}
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
                      <NewInputField
                        inputStyling='w-11/12 my-5 px-2 border-b text-xl focus:outline-none'
                        name='updateEmail'
                        placeholder='Email'
                        label='Email'
                        type='email'
                        showLabel={false}
                        disabled={
                          data?.me?.facebookId || data?.me?.googleId
                            ? true
                            : false
                        }
                        maxLength={30}
                      />
                      <NewInputField
                        inputStyling='w-11/12 my-5 px-2 border-b text-xl focus:outline-none'
                        name='updatePassword'
                        placeholder='New password'
                        label='Password'
                        showLabel={false}
                        type='password'
                        hidden={
                          data?.me?.facebookId || data?.me?.googleId
                            ? true
                            : false
                        }
                      />
                      <NewInputField
                        inputStyling='w-11/12 my-5 px-2 border-b text-xl focus:outline-none'
                        name='confirmNewPassword'
                        placeholder='Confirm new password'
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
                    className='flex self-center mx-auto py-2 px-4 text-white bg-pink-600 focus:outline-none rounded-md transform hover:scale-105 active:scale-90 disabled:opacity-70'
                    type='submit'
                    disabled={
                      data?.me?.facebookId || data?.me?.googleId ? true : false
                    }
                  >
                    save
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
