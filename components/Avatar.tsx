import { Image } from 'cloudinary-react'

import { UserFragment } from '../generated/graphql'

interface AvatarProps {
  height: number
  user: UserFragment
}

export const Avatar: React.FC<AvatarProps> = ({ height, user }) => {
  return (
    <>
      {user.photo && (user.googleId || user.facebookId) ? (
        <Image
          className='rounded-full'
          src={user.photo}
          height={height}
          width={height}
        />
      ) : user.photo ? (
        <Image
          className='rounded-full'
          cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
          publicId={user.photo}
          height={height}
          width={height}
          crop='fill'
        />
      ) : (
        <div className='w-max mx-auto'>
          <Image
            className='rounded-full'
            src='/avatar.jpg'
            height={height}
            width={height}
          />
        </div>
      )}
    </>
  )
}
