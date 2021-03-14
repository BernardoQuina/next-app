import Link from 'next/link'
import { Image } from 'cloudinary-react'
import { Edit } from './svg/Edit'

interface UserCardProps {
  userName: string
  userEmail: string
  userPhoto?: string
}

const UserCard: React.FC<UserCardProps> = ({
  userName,
  userEmail,
  userPhoto,
}) => {
  return (
    <div className='flex max-w-max mx-auto px-6 py-4 m-6 rounded-md shadow-lg'>
      <div className='md:flex'>
        {userPhoto ? (
          <div className='w-max mx-auto'>
            <Image
              className='rounded-full'
              src={userPhoto}
              height={60}
              width={60}
            />
          </div>
        ) : (
          <div className='w-max mx-auto'>
            <Image
              className='rounded-full'
              src='/avatar.jpg'
              height={60}
              width={60}
            />
          </div>
        )}

        <div className='mx-auto md:mx-6'>
          <div className='font-bold text-xl text-center'>{userName}</div>
          <div className='font-medium text-gray-400'>{userEmail}</div>
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
