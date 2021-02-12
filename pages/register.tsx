import { NextPage } from 'next'
import { Formik, Form } from 'formik'

import { useRegisterMutation, MeQuery, MeDocument } from '../generated/graphql'
import withApollo from '../lib/apollo'
import InputField from '../components/InputField'
import { Router, useRouter } from 'next/router'

interface registerProps {}

const register: NextPage<registerProps> = ({}) => {
  const router = useRouter()
  const [register] = useRegisterMutation()

  console.log('register: ', register.toString())

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (
          { name, email, password, confirmPassword },
          { setErrors }
        ) => {
          const response = await register({
            variables: { name, email, password, confirmPassword },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.createUser?.user,
                },
              })
            },
          })

          if (response.errors) {
            console.log('errors: ', response.errors)
            setErrors(response.errors[0])
          } else if (response.data?.createUser?.user) {
            localStorage.setItem('authToken', response.data.createUser.token!)
            router.push('/')
          }
        }}
      >
        {() => (
          <Form>
            <InputField
              name='name'
              placeholder='name'
              label='Name'
              type='text'
            />
            <InputField
              name='email'
              placeholder='email'
              label='Email'
              type='email'
            />
            <InputField
              name='password'
              placeholder='password'
              label='Password'
              type='password'
            />
            <InputField
              name='confirmPassword'
              placeholder='confirm password'
              label='Confirm Password'
              type='password'
            />
            <button
              className='inline py-2 px-4 rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white   active:bg-pink-900 active:border-pink-900'
              type='submit'
            >
              register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default withApollo({ ssr: false })(register)
