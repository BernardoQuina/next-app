import { NextPage } from 'next'
import { motion } from 'framer-motion'

import { Header } from '../components/Header'
import { Layout } from '../components/Layout'
import { withApollo } from '../lib/apollo'
import { variants } from '../utils/animations'

interface aboutProps {}

const about: NextPage<aboutProps> = ({}) => {
  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={variants}
    >
      <Layout>
        <Header />
        <p className='my-10 mx-auto text-center font-light text-2xl max-w-screen-sm leading-loose'>
          This simple frontend project is a follow up and integration with my
          backend. It was built using Typescript, NextJS & Apollo Client as well
          as TailwindCSS for styling & Framer Motion for animations.
        </p>
      </Layout>
    </motion.div>
  )
}

export default withApollo({ ssr: true })(about)
