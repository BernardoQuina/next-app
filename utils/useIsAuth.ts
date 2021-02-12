import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMeQuery } from '../generated/graphql'

export const useIsAuth = () => {
  const router = useRouter()

  const { data, loading } = useMeQuery()

  console.log('data: ', data)

  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace('/login?next=' + router.pathname)
    }
  }, [loading, data, router])
}