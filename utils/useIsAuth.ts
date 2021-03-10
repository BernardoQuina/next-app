import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMeQuery } from '../generated/graphql'
import { isServer } from './isServer'

export const useIsAuth = (push?: boolean) => {
  const router = useRouter()

  const { data, loading } = useMeQuery({ errorPolicy: 'all', skip: isServer() })

  useEffect(() => {
    if (!loading && !data?.me && push) {
      router.push('/login')
    }
  }, [loading, data, push])
}
