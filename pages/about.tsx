import { NextPage } from 'next'
import { Header } from '../components/Header'
import { Layout } from '../components/Layout'
import { withApollo } from '../lib/apollo'

interface aboutProps {}

const about: NextPage<aboutProps> = ({}) => {
  return (
    <Layout>
      <Header />
      <p className='my-10 mx-auto text-center font-light text-2xl max-w-screen-sm leading-loose'>
        This simple frontend project is a follow up and integration with my
        backend.  It was built using Typescript, NextJS & Apollo Client as well as TailwindCSS for styling.
      </p>
    </Layout>
  )
}

export default withApollo({ ssr: true })(about)
