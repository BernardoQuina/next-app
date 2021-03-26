import { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { withApollo } from '../../lib/apollo'

interface changePasswordProps {}

const changePassword: NextPage<changePasswordProps> = ({}) => {
  const router = useRouter()
  const [tokenError, setTokenError] = useState('')

  const token = router.query.token

  return <div>token is: {token}</div>
}

export default withApollo({ ssr: false })(changePassword)
