import Link from 'next/link'
import Image from 'next/image'

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
  // useEffect(() => {
  //   if (userPhoto) {
  //     console.log(userPhoto)
  //   }
  // }, [userPhoto])

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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='self-center stroke-current h-14 text-pink-600'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.3}
              d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        )}

        <div className='mx-auto md:mx-6'>
          <div className='font-bold text-xl text-center'>{userName}</div>
          <div className='font-medium text-gray-400'>{userEmail}</div>
        </div>
      </div>

      <Link href='/profile/edit'>
        <button type='button'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-7 p-1 self-start rounded-lg bg-pink-200 fill-current text-pink-600 transform hover:scale-110'
          >
            <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
          </svg>
        </button>
      </Link>
    </div>
  )
}

export default UserCard
