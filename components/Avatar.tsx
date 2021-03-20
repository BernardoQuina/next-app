import { Image } from 'cloudinary-react'
import { BasicUserInfoFragment } from '../generated/graphql'

interface AvatarProps {
  height: number
  user: BasicUserInfoFragment
}

export const Avatar: React.FC<AvatarProps> = ({ height, user }) => {
  return (
    <>
      {user.photo && (user.googleId || user.facebookId) ? (
        <Image
          className='rounded-full mx-auto'
          src={user.photo}
          height={height}
          width={height}
        />
      ) : user.photo ? (
        <Image
          className='rounded-full mx-auto'
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
