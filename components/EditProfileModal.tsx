import React, { Dispatch, SetStateAction, useState, useRef } from 'react'
import { Formik, Form } from 'formik'
import { Image } from 'cloudinary-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Avatar } from './Avatar'
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
import { ProfileImageUpload } from './ProfileImageUpload'

interface EditProfileModalProps {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  setShowModal,
  showModal,
}) => {
  const [uploadedImage, setUploadedImage] = useState<{ public_id: string }[]>(
    []
  )

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
          <Formik
            initialValues={{
              password: '',
              updateName: data?.me?.name!,
              updatePhoto: data?.me?.photo,
            }}
            onSubmit={async (
              {
                updateName,
                updatePhoto,
              },
              { setErrors }
            ) => {
              updatePhoto = uploadedImage[0]
                ? uploadedImage[0].public_id
                : undefined

              const response = await editUser({
                variables: {
                  updateName,
                  updatePhoto,
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
                return setErrors({ updateName: response.errors[0].message })
              }

              setShowModal(false)
            }}
          >
            {({ values }) => (
              <motion.div variants={scaleUp}>
                <Form className='max-w-2xl sm:mx-auto mx-4 my-20 pb-6 rounded-lg shadow-xl bg-white'>
                  <button
                    type='button'
                    onClick={() => setShowModal(false)}
                    className='focus:outline-none'
                  >
                    <X tailwind='h-6 mt-2 ml-4 text-pink-600 transform hover:scale-125' />
                  </button>
                  <div className='md:flex border-t-2 mb-8'>
                    <div className='m-2'>
                      {uploadedImage[0] ? (
                        <div className='w-max mx-auto'>
                          <Image
                            className='rounded-full'
                            cloudName={
                              process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                            }
                            publicId={uploadedImage[0].public_id}
                            height={150}
                            width={150}
                            crop='fill'
                          />
                        </div>
                      ) : data && data.me ? (
                        <Avatar user={data?.me!} height={150} />
                      ) : null}
                      <ProfileImageUpload
                        setUploadedImages={setUploadedImage}
                        uploadedImages={uploadedImage}
                      />
                    </div>
                    <div className='w-full'>
                      <NewInputField
                        inputStyling='w-11/12 my-6 px-2 border-b text-xl focus:outline-none'
                        name='updateName'
                        placeholder='Name'
                        label='Name'
                        showLabel={false}
                        type='text'
                        maxLength={20}
                      />
                    </div>
                  </div>
                  <button
                    className='flex self-center mx-auto py-2 px-4 text-white bg-pink-600 focus:outline-none rounded-md transform hover:scale-105 active:scale-90 disabled:opacity-70'
                    type='submit'
                    disabled={values.updateName.length < 8}
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
