import { NextPage } from 'next'
import withApollo from '../lib/apollo'
import { useIsAuth } from '../utils/useIsAuth'

interface newPostProps {

}

const newPost: NextPage<newPostProps> = ({  }) => {

  useIsAuth()

  return (
    <div>posts are here</div>
  )
}

export default withApollo({ ssr: false })(newPost)
