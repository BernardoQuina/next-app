import { NextPage } from 'next'
import Meta from '../components/Meta'

interface aboutProps {}

const about: NextPage<aboutProps> = ({}) => {
  return (
    <div>
      <Meta title='About' />
      <h1>About</h1>
    </div>
  )
}

export default about
