import { useApolloClient } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMeQuery } from '../generated/graphql'

import { isServer } from '../utils/isServer'

interface NavProps {}

export const Nav: React.FC<NavProps> = () => {
  const router = useRouter()

  const [user, setUser] = useState('')

  const apolloClient = useApolloClient()

  const { data, loading, error } = useMeQuery({
    skip: isServer(),
    errorPolicy: 'all',
  })

  useEffect(() => {
    if (!loading && data) {
      setUser(data.me?.name!)
    } else if (!localStorage.getItem('authToken') || error) {
      setUser('')
    }
  }, [data, loading, user, error])

  const logoutHandler = async () => {
    localStorage.removeItem('authToken')
    await apolloClient.resetStore()
    router.push('/login')
  }

  let userLogin

  if (error?.message) {
    return <div>{error.message}</div>
  }

  if (!data?.me) {
    userLogin = (
      <ul className='flex'>
        <li className='border ml-2 border-black hover:border-white rounded-md p-1 px-2'>
          <Link href='/login'>Login</Link>
        </li>
        <li className='border mr-auto border-black hover:border-white rounded-md p-1 px-2'>
          <Link href='/register'>Register</Link>
        </li>
      </ul>
    )
  } else {
    userLogin = (
      <ul className='flex'>
        <li className='border rounded-md min-w-max p-1 px-2 mx-4 border-black hover:border-white'>
          <Link href='/profile'>
            <button type='button'>{user}</button>
          </Link>
        </li>
        <li className='border border-black hover:border-white rounded-md p-1 px-2'>
          <button type='button' onClick={logoutHandler}>
            {error?.message === 'Authentication required.'
              ? 'logging out...'
              : 'logout'}
          </button>
        </li>
      </ul>
    )
  }

  return (
    <nav className='bg-black text-white flex justify-center p-3'>
      <ul className='flex w-full 2xl:w-5/12'>
        <li className='border mx-2 border-black hover:border-white rounded-md p-1 px-2'>
          <Link href='/'>Home</Link>
        </li>
        <li className='border border-black hover:border-white rounded-md p-1 px-2'>
          <Link href='/about'>About</Link>
        </li>
      </ul>

      {userLogin}
    </nav>
  )
}
