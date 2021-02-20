import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMeQuery } from '../generated/graphql'

export const useIsAuth = () => {
  const router = useRouter()

  const { data, loading } = useMeQuery({errorPolicy: 'all'})

  useEffect(() => {
    if (!loading && !data?.me) {
      router.push('/login')
    }
  }, [loading, data])
}