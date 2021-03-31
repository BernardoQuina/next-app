import { Dispatch, SetStateAction } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import {
  MyNotificationsQuery,
  useMarkAsReadMutation,
} from '../generated/graphql'
import { Avatar } from './Avatar'
import { Spinner } from './svg/Spinner'
import { scaleUp } from '../utils/animations'

interface NotificationsModalProps {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  data?: MyNotificationsQuery
  loading: boolean
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  showModal,
  setShowModal,
  data,
  loading,
}) => {
  const [markAsRead] = useMarkAsReadMutation()

  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          key='21342355'
          initial='initial'
          animate='animate'
          exit='exit'
          variants={scaleUp}
        >
          <div className='absolute transform rotate-45 ml-2 mt-2 h-5 w-5 bg-white'></div>
          <div className='absolute mt-3 md:-ml-64 -ml-48 max-h-96 w-80 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 rounded-md shadow-lg bg-white'>
            {!data && loading ? (
              <Spinner />
            ) : (!data && !loading) ||
              !data?.myNotifications ||
              data.myNotifications.length === 0 ? (
              <p className='p-4 text-black text-center'>
                no notifications yet!
              </p>
            ) : (
              <div>
                {data.myNotifications.map((notification) => (
                  <div key={notification?.id}>
                    <Link href={notification?.link!}>
                      <button
                        type='button'
                        onClick={async () => {
                          await markAsRead({
                            variables: { notificationId: notification?.id! },
                            update: (cache) => {
                              cache.modify({
                                id: 'Notification:' + notification?.id!,
                                fields: {
                                  read() {
                                    return true
                                  },
                                },
                              })
                            },
                          })
                          setShowModal(false)
                        }}
                        className={`p-4 w-full h-full focus:outline-none flex text-black ${
                          !notification?.read ? 'bg-pink-100' : ''
                        } `}
                      >
                        <div className='-ml-2 mr-2'>
                          <Avatar
                            user={notification?.dispatcher!}
                            height={40}
                          />
                        </div>
                        <p className='self-center text-left w-10/12'>
                          {notification?.message}
                        </p>
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NotificationsModal
