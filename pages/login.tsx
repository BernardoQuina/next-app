import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'

import { InputField } from '../components/InputField'
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql'
import { withApollo } from '../lib/apollo'

interface loginProps {}

const login: NextPage<loginProps> = ({}) => {
  const router = useRouter()

  const [login] = useLoginMutation({ errorPolicy: 'all' })

  return (
    <div>
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
                  me: data?.loginUser?.user,
                },
              })
            },
          })

          if (response.errors) {
            console.log(response.errors)
            // backend doesn't specify the field error so all errors go to "name"
            setErrors({ email: response.errors[0].message })
          } else if (response.data?.loginUser?.user) {
            localStorage.setItem('authToken', response.data.loginUser.token!)
            router.push('/')
          }
        }}
      >
        {() => (
          <Form className='border hover:border-pink-600 shadow-xl rounded-lg mb-10 pb-6'>
            <h1 className='my-6 text-center text-4xl font-extrabold text-pink-600'>
              Welcome Back
            </h1>
            <InputField
              name='email'
              placeholder='john@example.com'
              label='Email'
              type='email'
            />
            <InputField
              name='password'
              placeholder=''
              label='Password'
              type='password'
            />
            <button
              className='flex self-center mx-auto py-2 px-4 focus:bg-pink-600 focus:text-white focus:outline-none rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900'
              type='submit'
            >
              login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default withApollo({ ssr: false })(login)
