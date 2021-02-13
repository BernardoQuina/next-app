import { NextPage } from 'next'
import { Formik, Form } from 'formik'

import { useRegisterMutation, MeQuery, MeDocument } from '../generated/graphql'
import withApollo from '../lib/apollo'
import InputField from '../components/InputField'
import { useRouter } from 'next/router'

interface registerProps {}

const register: NextPage<registerProps> = ({}) => {
  const router = useRouter()
  const [register] = useRegisterMutation({ errorPolicy: 'all' })

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
            // backend doesn't specify the field error so all errors go to "name"
            setErrors({ name: response.errors[0].message })
          } else if (response.data?.createUser?.user) {
            localStorage.setItem('authToken', response.data.createUser.token!)
            router.push('/')
          }
        }}
      >
        {() => (
          <Form className='border hover:border-pink-600 shadow-xl p-6 rounded-lg'>
            <InputField
              name='name'
              placeholder='John Doe'
              label='Name'
              type='text'
            />
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
            <InputField
              name='confirmPassword'
              placeholder=''
              label='Confirm Password'
              type='password'
            />
            <button
              className='flex self-center mx-auto py-2 px-4 focus:bg-pink-600 focus:text-white focus:outline-none rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900'
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
