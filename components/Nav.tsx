import { useApolloClient } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Image } from 'cloudinary-react'
import { useEffect, useState } from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'

import { isServer } from '../utils/isServer'
import { Logout } from './svg/Logout'

interface NavProps {}

export const Nav: React.FC<NavProps> = () => {
  const router = useRouter()

  const [user, setUser] = useState('')

  const apolloClient = useApolloClient()

  const { data, loading, error } = useMeQuery({
    skip: isServer(),
    errorPolicy: 'all',
  })

  const [logout] = useLogoutMutation()

  useEffect(() => {
    if (!loading && data) {
      setUser(data.me?.name!)
    }
  }, [data, loading, user])

  const logoutHandler = async () => {
    router.push('/login')
    await logout()
    await apolloClient.resetStore()
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
        <li className='border rounded-md min-w-max px-2 self-center sm:mx-4 border-black'>
          <Link href='/profile'>
            <button className='max-h-10 align-middle' type='button'>
              {data.me.photo ? (
                <Image
                  className='rounded-full'
                  src={data.me.photo}
                  height={40}
                  width={40}
                />
              ) : (
                <div className='w-max mx-auto'>
                  <Image
                    className='rounded-full'
                    src='/avatar.jpg'
                    height={40}
                    width={40}
                  />
                </div>
              )}
            </button>
          </Link>
        </li>
        <li className='border border-black rounded-md p-1 px-2 self-center'>
          <button
            className='align-middle'
            type='button'
            onClick={logoutHandler}
          >
            {error?.message === 'Authentication required.' ? (
              'logging out...'
            ) : (
              <Logout
                tailwind='h-7 text-white transform hover:scale-105'
                strokeWidth={1.5}
              />
            )}
          </button>
        </li>
      </ul>
    )
  }

  return (
    <nav className='flex justify-center p-3 bg-black text-white'>
      <ul className='flex w-1/2 2xl:w-5/12 mr-6'>
        <li className='border md:mx-2 border-black hover:border-white rounded-md p-1 px-2'>
          <Link href='/'>
            <a className='align-middle'>Home</a>
          </Link>
        </li>
        <li className='border border-black hover:border-white rounded-md p-1 px-2'>
          <Link href='/about'>
            <a className='align-middle'>About</a>
          </Link>
        </li>
      </ul>

      {userLogin}
    </nav>
  )
}
