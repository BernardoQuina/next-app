import { useApolloClient } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  useLogoutMutation,
  useMarkAsSeenMutation,
  useMeQuery,
  useMyNotificationsQuery,
} from '../generated/graphql'

import { isServer } from '../utils/isServer'
import { Logout } from './svg/Logout'
import { Avatar } from './Avatar'
import { Bell } from './svg/Bell'
import NotificationsModal from './NotificationsModal'

interface NavProps {}

export const Nav: React.FC<NavProps> = () => {
  const router = useRouter()

  const [user, setUser] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)

  const apolloClient = useApolloClient()

  const { data, loading, error } = useMeQuery({
    skip: isServer(),
    errorPolicy: 'all',
  })

  const {
    data: notificationData,
    loading: notificationLoading,
    refetch,
  } = useMyNotificationsQuery({
    skip: isServer() || !data?.me,
    errorPolicy: 'all',
    pollInterval: 30000,
  })

  const newNotifications = notificationData?.myNotifications?.filter(
    (notification) => {
      return notification?.seen === false
    }
  )

  let notificationsIds: string[] = []

  newNotifications?.forEach((notification) => {
    if (notification && notification.id) {
      notificationsIds.push(notification.id)
    }
  })

  const [markAsSeen] = useMarkAsSeenMutation({
    variables: { notificationsIds },
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
    await apolloClient.clearStore()
  }

  let userLogin

  if (error?.message) {
    return <div>{error.message}</div>
  }

  if (!data?.me) {
    userLogin = (
      <ul className='flex'>
        <li className='ml-2 p-1 px-2'>
          <Link href='/login'>
            <button
              type='button'
              className={
                router.pathname === '/login'
                  ? 'align-middle transform hover:scale-110 font-semibold focus:outline-none'
                  : 'align-middle transform hover:scale-110 hover:font-semibold focus:outline-none'
              }
            >
              Login
            </button>
          </Link>
        </li>
        <li className='mr-auto p-1 px-2'>
          <Link href='/register'>
            <button
              type='button'
              className={
                router.pathname === '/register'
                  ? 'align-middle transform hover:scale-110 font-semibold focus:outline-none'
                  : 'align-middle transform hover:scale-110 hover:font-semibold focus:outline-none'
              }
            >
              Register
            </button>
          </Link>
        </li>
      </ul>
    )
  } else {
    userLogin = (
      <ul className='flex'>
        <li className='p-1 px-2 self-center'>
          <button
            className='align-middle focus:outline-none'
            type='button'
            onClick={async () => {
              setShowNotifications(!showNotifications)
              if (!showNotifications) {
                await markAsSeen()
                refetch()
              }
            }}
          >
            {newNotifications && newNotifications.length > 0 ? (
              <div className='absolute h-5 w-5 -mt-2 ml-5 rounded-full bg-red-500'>
                <p className='text-sm font-medium'>{newNotifications.length}</p>
              </div>
            ) : null}
            <Bell
              tailwind='h-7 ml-1 text-white fill-current transform hover:scale-105'
              strokeWidth={0.5}
            />
          </button>
          <NotificationsModal
            showModal={showNotifications}
            setShowModal={setShowNotifications}
            loading={notificationLoading}
            data={notificationData}
          />
        </li>
        <li className='min-w-max px-2 self-center sm:mx-4'>
          <Link href={`/user/${data.me.id}`}>
            <button
              className='max-h-10 align-middle focus:outline-none'
              type='button'
            >
              <Avatar height={40} user={data.me} />
            </button>
          </Link>
        </li>
        <li className='p-1 px-2 self-center'>
          <button
            className='align-middle focus:outline-none'
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
    <nav className='fixed w-full flex justify-center p-3 bg-black text-white z-20'>
      <ul className='flex w-1/2 2xl:w-5/12 mr-6'>
        <li className='md:mx-2 p-1 px-2'>
          <Link href='/'>
            <button
              type='button'
              className={
                router.pathname === '/'
                  ? 'align-middle transform hover:scale-110 font-semibold focus:outline-none'
                  : 'align-middle transform hover:scale-110 hover:font-semibold focus:outline-none'
              }
            >
              Home
            </button>
          </Link>
        </li>
        <li className='p-1 px-2'>
          <Link href='/about'>
            <button
              type='button'
              className={
                router.pathname === '/about'
                  ? 'align-middle transform hover:scale-110 font-semibold focus:outline-none'
                  : 'align-middle transform hover:scale-110 hover:font-semibold focus:outline-none'
              }
            >
              About
            </button>
          </Link>
        </li>
      </ul>

      {userLogin}
    </nav>
  )
}
