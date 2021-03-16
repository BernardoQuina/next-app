import { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Formik, Form } from 'formik'
import { motion } from 'framer-motion'

import { withApollo } from '../../lib/apollo'
import {
  MeDocument,
  MeQuery,
  useEditUserMutation,
  useMeQuery,
} from '../../generated/graphql'
import { Layout } from '../../components/Layout'
import { InputField } from '../../components/InputField'
import { ImageUpload } from '../../components/ImageUpload'
import { isServer } from '../../utils/isServer'
import { useIsAuth } from '../../utils/useIsAuth'
import { variants } from '../../utils/animations'
import { Loader } from '../../components/Loader'
import { Delete } from '../../components/svg/Delete'

interface editProps {}

const edit: NextPage<editProps> = ({}) => {
  const router = useRouter()

  const [uploadedImage, setUploadedImage] = useState<{ public_id: string }[]>(
    []
  )

  const { data, loading } = useMeQuery({
    skip: isServer(),
    errorPolicy: 'all',
  })

  useIsAuth(true)

  const [editUser] = useEditUserMutation({ errorPolicy: 'all' })

  if (!data || loading) {
    ;<Loader />
  }

  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={variants}
    >
      <Layout>
        <Formik
          initialValues={{
            password: '',
            updateName: data?.me?.name!,
            updatePhoto: data?.me?.photo,
            updateEmail: data?.me?.email!,
            updatePassword: '',
            confirmNewPassword: '',
          }}
          onSubmit={async (
            {
              password,
              updateName,
              updatePhoto,
              updateEmail,
              updatePassword,
              confirmNewPassword,
            },
            { setErrors }
          ) => {
            updatePhoto = uploadedImage[0]
              ? uploadedImage[0].public_id
              : undefined

            const response = await editUser({
              variables: {
                password,
                updateName,
                updatePhoto,
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
              setErrors({ password: response.errors[0].message })
            } else if (response.data?.updateUser) {
              router.push('/profile')
            }
          }}
        >
          {() => (
            <Form className='max-w-lg mx-auto border hover:border-pink-600 shadow-xl rounded-lg mb-10 pb-6'>
              <h1 className='my-6 text-center text-4xl font-extrabold text-pink-600'>
                Edit profile
              </h1>
              {data?.me?.facebookId || data?.me?.googleId ? (
                <p className='my-6 mx-8 p-4 text-center rounded-md bg-pink-100'>
                  Since your profile is associated with google or facebook, you
                  can't edit it, only delete it.
                </p>
              ) : null}
              <InputField
                name='password'
                placeholder=''
                label={
                  data?.me?.facebookId || data?.me?.googleId
                    ? undefined
                    : 'Password'
                }
                type='password'
                hidden={
                  data?.me?.facebookId || data?.me?.googleId ? true : false
                }
              />
              <InputField
                name='updateName'
                label={
                  data?.me?.facebookId || data?.me?.googleId
                    ? 'Name'
                    : 'Update name'
                }
                type='text'
                disabled={
                  data?.me?.facebookId || data?.me?.googleId ? true : false
                }
              />
              {data?.me?.facebookId || data?.me?.googleId ? null : (
                <ImageUpload
                  isAvatar={true}
                  uploadedImages={uploadedImage}
                  setUploadedImages={setUploadedImage}
                />
              )}

              <InputField
                name='updateEmail'
                label={
                  data?.me?.facebookId || data?.me?.googleId
                    ? 'Email'
                    : 'Update email'
                }
                type='email'
                disabled={
                  data?.me?.facebookId || data?.me?.googleId ? true : false
                }
              />
              <InputField
                name='updatePassword'
                placeholder=''
                label={
                  data?.me?.facebookId || data?.me?.googleId
                    ? undefined
                    : 'New password'
                }
                type='password'
                hidden={
                  data?.me?.facebookId || data?.me?.googleId ? true : false
                }
              />
              <InputField
                name='confirmNewPassword'
                placeholder=''
                label={
                  data?.me?.facebookId || data?.me?.googleId
                    ? undefined
                    : 'Confirm new password'
                }
                type='password'
                hidden={
                  data?.me?.facebookId || data?.me?.googleId ? true : false
                }
              />
              <div className='flex'>
                <button
                  className='mx-auto py-2 px-4 focus:bg-pink-600 focus:text-white focus:outline-none rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900 disabled:opacity-25'
                  type='submit'
                  disabled={
                    data?.me?.facebookId || data?.me?.googleId ? true : false
                  }
                >
                  edit
                </button>
              </div>
              <div>
                <Link href='/profile/delete'>
                  <button type='button' className='ml-6 mt-6'>
                    <Delete
                      tailwind='w-7 p-1 rounded-lg bg-red-100 stroke-current text-red-600 transform hover:scale-110'
                      strokeWidth={2}
                    />
                  </button>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </Layout>
    </motion.div>
  )
}

export default withApollo({ ssr: false })(edit)
