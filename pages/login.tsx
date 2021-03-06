import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Formik, Form } from 'formik'
import { motion } from 'framer-motion'

import { withApollo } from '../lib/apollo'
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql'
import { InputField } from '../components/InputField'
import { Layout } from '../components/Layout'
import { OauthSignIn } from '../components/OauthSignIn'
import { variants } from '../utils/animations'
import { useIsAuth } from '../utils/useIsAuth'
interface loginProps {}

const login: NextPage<loginProps> = ({}) => {
  const router = useRouter()

  const [login] = useLoginMutation({ errorPolicy: 'all' })

  useIsAuth()

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
            email: '',
            password: '',
          }}
          onSubmit={async ({ email, password }, { setErrors }) => {
            const response = await login({
              variables: { email, password },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: 'Query',
                    me: data?.loginUser,
                  },
                })
              },
            })

            if (response.errors) {
              console.log(response.errors)
              // backend doesn't specify the field error so all errors go to "name"
              setErrors({ email: response.errors[0].message })
            } else if (response.data?.loginUser) {
              router.push('/')
            }
          }}
        >
          {() => (
            <Form className='max-w-lg mx-auto border hover:border-pink-600 shadow-xl rounded-lg mb-10 pb-6'>
              <h1 className='my-6 text-center text-4xl font-extrabold text-pink-600'>
                Welcome Back
              </h1>
              <InputField
                name='email'
                placeholder='john@example.com'
                label='Email'
                type='email'
              />
              <InputField name='password' label='Password' type='password' />
              <Link href='/forgot-password'>
                <p className='text-center ml-24 -mt-8 hover:underline cursor-pointer'>
                  forgot password?
                </p>
              </Link>
              <button
                className='flex mt-8 mx-auto py-2 px-4 rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900 disabled:opacity-30'
                type='submit'
              >
                login
              </button>
            </Form>
          )}
        </Formik>
        <OauthSignIn />
      </Layout>
    </motion.div>
  )
}

export default withApollo({ ssr: false })(login)
