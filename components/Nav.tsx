import { useApolloClient } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMeQuery } from '../generated/graphql'

import { isServer } from '../utils/isServer'

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const router = useRouter()

  const [user, setUser] = useState('')

  const apolloClient = useApolloClient()

  const { data, loading, error } = useMeQuery({ skip: isServer(), errorPolicy: 'all' })

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
  

  return (
    <nav className='bg-black text-white flex justify-center p-3'>
      <ul className='flex w-full 2xl:w-5/12'>
        <li className='border mx-4 border-black hover:border-white rounded-md p-1 px-2'>
          <Link href='/'>Home</Link>
        </li>
        <li className='border border-black hover:border-white rounded-md p-1 px-2'>
          <Link href='/about'>About</Link>
        </li>
      </ul>

      {!user ? (
        <ul className='flex'>
          <li className='border mx-4 border-black hover:border-white rounded-md p-1 px-2'>
            <Link href='/login'>Login</Link>
          </li>
          <li className='border mr-4 border-black hover:border-white rounded-md p-1 px-2'>
            <Link href='/register'>Register</Link>
          </li>
        </ul>
      ) : (
        <ul className='flex'>
          <li className='border mx-4 border-black hover:border-white rounded-md p-1 px-2'>
            <Link href='/profile'>{user}</Link>
          </li>
          <li className='border mr-4 border-black hover:border-white rounded-md p-1 px-2'>
            <button type='button' onClick={logoutHandler}>logout</button>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Nav
