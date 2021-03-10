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
import { isServer } from '../../utils/isServer'
import { useIsAuth } from '../../utils/useIsAuth'
import { variants } from '../../utils/animations'

interface editProps {}

const edit: NextPage<editProps> = ({}) => {
  const router = useRouter()

  const { data, loading } = useMeQuery({
    skip: isServer(),
    errorPolicy: 'all',
  })

  useIsAuth(true)

  const [editUser] = useEditUserMutation({ errorPolicy: 'all' })

  if (!data || loading) {
    ;<div>loading...</div>
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
            updateEmail: data?.me?.email!,
            updatePassword: '',
            confirmNewPassword: '',
          }}
          onSubmit={async (
            {
              password,
              updateName,
              updateEmail,
              updatePassword,
              confirmNewPassword,
            },
            { setErrors }
          ) => {
            const response = await editUser({
              variables: {
                password,
                updateName,
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
              console.log('here')
              console.log(response.errors[0].message)
              // backend doesn't specify the field error so all errors go to first field
              setErrors({ password: response.errors[0].message })
            } else if (response.data?.updateUser) {
              console.log(response.data.updateUser)
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
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      fill='none'
                      className='w-8 p-1 rounded-lg bg-red-100 stroke-current text-red-600 transform hover:scale-110'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
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
