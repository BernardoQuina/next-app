import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import { motion } from 'framer-motion'

import { withApollo } from '../../lib/apollo'
import {
  useChangePasswordMutation,
  MeQuery,
  MeDocument,
} from '../../generated/graphql'
import { useIsAuth } from '../../utils/useIsAuth'
import { Layout } from '../../components/Layout'
import { InputField } from '../../components/InputField'
import { variants } from '../../utils/animations'

interface changePasswordProps {}

const changePassword: NextPage<changePasswordProps> = ({}) => {
  const router = useRouter()

  useIsAuth()

  const [changePassword] = useChangePasswordMutation({ errorPolicy: 'all' })

  const token = typeof router.query.token === 'string' ? router.query.token : ''

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
            newPassword: '',
            confirmPassword: '',
          }}
          onSubmit={async ({ newPassword, confirmPassword }, { setErrors }) => {
            const response = await changePassword({
              variables: { token, newPassword, confirmPassword },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: 'Query',
                    me: data?.changePassword,
                  },
                })
              },
            })

            if (response.errors) {
              // backend doesn't specify the field error so all errors go to first field
              setErrors({ newPassword: response.errors[0].message })
            } else if (response.data?.changePassword) {
              router.push('/')
            }
          }}
        >
          {() => (
            <Form className='max-w-lg mx-auto border shadow-xl rounded-lg mb-10 pb-6'>
              <h1 className='my-6 text-center text-4xl font-extrabold text-pink-600'>
                Reset Password
              </h1>
              <InputField
                name='newPassword'
                label='New Password'
                type='password'
              />
              <InputField
                name='confirmPassword'
                label='Confirm Password'
                type='password'
              />
              <button
                className='flex mt-8 mx-auto py-2 px-4 rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900 focus:outline-none'
                type='submit'
              >
                reset
              </button>
            </Form>
          )}
        </Formik>
      </Layout>
    </motion.div>
  )
}

export default withApollo({ ssr: false })(changePassword)
