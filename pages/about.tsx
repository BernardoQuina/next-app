import { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { withApollo } from '../lib/apollo'

interface aboutProps {}

const about: NextPage<aboutProps> = ({}) => {
  return (
    <Layout>
      <h1 className='text-center'>About</h1>
    </Layout>
  )
}

export default withApollo({ssr: true})(about)
