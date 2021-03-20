import Link from 'next/link'

import { Edit } from './svg/Edit'
import { UserFragment } from '../generated/graphql'
import { Avatar } from './Avatar'

interface UserCardProps {
  user: UserFragment
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div className='flex max-w-max mx-auto px-6 py-4 m-6 rounded-md shadow-lg'>
      <div className='md:flex'>
        <Avatar user={user} height={60} />

        <div className='mx-auto mt-2 md:mx-6'>
          <div className='font-bold text-xl text-center'>{user.name}</div>
          <div className='font-medium text-gray-400'>{user.email}</div>
        </div>
      </div>

      <Link href='/profile/edit'>
        <button type='button' className='focus:outline-none'>
          <Edit tailwind='w-7 p-1 self-start rounded-lg bg-pink-200 fill-current text-pink-600 transform hover:scale-110' />
        </button>
      </Link>
    </div>
  )
}

export default UserCard
