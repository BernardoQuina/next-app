import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'

import {
  MeDocument,
  MeQuery,
  useEditUserMutation,
  useMeQuery,
} from '../../generated/graphql'
import { Layout } from '../../components/Layout'
import { InputField } from '../../components/InputField'
import { isServer } from '../../utils/isServer'

interface editProps {}

const edit: NextPage<editProps> = ({}) => {
  const router = useRouter()

  const { data } = useMeQuery({
    skip: isServer(),
    errorPolicy: 'all',
  })

  const [editUser] = useEditUserMutation({errorPolicy: 'all'})

  return (
    <Layout>
      <Formik
        initialValues={{
          password: '',
          updateName: data?.me?.name,
          updateEmail: data?.me?.email,
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
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.updateUser,
                },
              })
            },
          })

          if (response.errors) {
            console.log('here')
            console.log(response.errors[0].message)
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
            <InputField
              name='password'
              placeholder=''
              label='Current password'
              type='password'
            />
            <InputField name='updateName' label='Update name' type='text' />
            <InputField name='updateEmail' label='Update email' type='email' />
            <InputField
              name='updatePassword'
              placeholder=''
              label='New password'
              type='password'
            />
            <InputField
              name='confirmNewPassword'
              placeholder=''
              label='Confirm new password'
              type='password'
            />
            <button
              className='flex self-center mx-auto py-2 px-4 focus:bg-pink-600 focus:text-white focus:outline-none rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900'
              type='submit'
            >
              edit
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withApollo({ ssr: false })(edit)
