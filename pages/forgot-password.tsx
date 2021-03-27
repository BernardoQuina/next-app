import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'

import { withApollo } from '../lib/apollo'
import { useForgotPasswordMutation } from '../generated/graphql'
import { Layout } from '../components/Layout'
import { InputField } from '../components/InputField'
import { fadeInUp, variants } from '../utils/animations'
import { useState } from 'react'

interface forgotPasswordProps {}

const forgotPassword: NextPage<forgotPasswordProps> = ({}) => {
  const router = useRouter()

  const [complete, setComplete] = useState(false)

  const [forgotPassword] = useForgotPasswordMutation({ errorPolicy: 'all' })

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
          }}
          onSubmit={async ({ email }, { setErrors }) => {
            const response = await forgotPassword({
              variables: { email },
            })

            if (response.errors) {
              // backend doesn't specify the field error so all errors go to first field
              setErrors({ email: response.errors[0].message })
            } else if (response.data?.forgotPassword) {
              setComplete(true)
            }
          }}
        >
          {() =>
            !complete ? (
              <Form className='max-w-lg mx-auto border shadow-xl rounded-lg mb-10 pb-6'>
                <h1 className='my-6 text-center text-4xl font-extrabold text-pink-600'>
                  Request new password email
                </h1>
                <InputField name='email' label='Email' type='email' />
                <button
                  className='flex mt-8 mx-auto py-2 px-4 rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900 focus:outline-none'
                  type='submit'
                >
                  request
                </button>
              </Form>
            ) : (
              <motion.div
                variants={fadeInUp}
                className='p-4 m-6 mx-auto w-5/12 flex self-center rounded-md bg-green-200 shadow-xl'
              >
                If an account with this email exists, we sent you an email
              </motion.div>
            )
          }
        </Formik>
      </Layout>
    </motion.div>
  )
}

export default withApollo({ ssr: false })(forgotPassword)
