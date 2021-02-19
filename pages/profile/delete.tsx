import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'

import { useDeleteUserMutation } from '../../generated/graphql'
import { withApollo } from '../../lib/apollo'
import { InputField } from '../../components/InputField'
import { Layout } from '../../components/Layout'

interface deleteProps {}

const deleteUser: NextPage<deleteProps> = ({}) => {
  const router = useRouter()

  const [deleteUser] = useDeleteUserMutation({ errorPolicy: 'all' })

  return (
    <Layout>
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
            console.log('here')
            console.log(response.errors[0].message)
            // backend doesn't specify the field error so all errors go to first field
            setErrors({ password: response.errors[0].message })
          } else if (response.data?.deleteUser) {
            localStorage.removeItem('authToken')
            router.push('/register')
          }
        }}
      >
        {() => (
          <Form className='max-w-lg mx-auto border hover:border-pink-600 shadow-xl rounded-lg mb-10 pb-6'>
            <h1 className='my-6 text-center text-2xl font-bold text-red-600'>
              Are you sure you want to delete your account?
            </h1>
            <InputField
              name='password'
              placeholder=''
              label='Password'
              type='password'
            />

            <button
              className='flex self-center mx-auto py-2 px-4 focus:bg-red-600 focus:text-white focus:outline-none rounded-md text-red-600 border border-red-600 hover:scale-105 hover:bg-red-600 hover:text-white active:bg-red-900 active:border-red-900'
              type='submit'
            >
              delete
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withApollo({ ssr: false })(deleteUser)
