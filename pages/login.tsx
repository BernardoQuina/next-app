import { NextPage } from 'next'

import withApollo from '../lib/apollo'

interface loginProps {

}

const login: NextPage<loginProps> = ({  }) => {
  return (
    <div>no login yet, hang in there</div>
  )
}

export default withApollo({ssr: false})(login)
