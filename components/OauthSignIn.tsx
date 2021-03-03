import Image from 'next/image'
import { useRouter } from 'next/router'

interface OauthSignInProps {}

export const OauthSignIn: React.FC<OauthSignInProps> = ({}) => {
  const router = useRouter()

  const googleLogin = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`)
  }

  const facebookLogin = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`)
  }

  return (
    <>
      <button
        className='flex my-8 py-2 px-4 mx-auto max-w-max rounded-md border-0 shadow-md group hover:bg-blue-400'
        type='button'
        onClick={googleLogin}
      >
        <p className='self-center mr-8 text-lg text-blue-500 group-hover:text-white'>
          Sign in with Google
        </p>
        <Image
          src='/google.png'
          width={40}
          height={40}
          className='rounded-full group-hover:bg-white'
        />
      </button>
      <button
        className='flex my-8 py-2 px-4 mx-auto max-w-max rounded-md border-0 shadow-md group hover:bg-blue-500'
        type='button'
        onClick={facebookLogin}
      >
        <p className='self-center mr-2 text-lg text-blue-500 group-hover:text-white'>
          Sign in with Facebook
        </p>
        <Image
          src='/facebook.png'
          width={40}
          height={40}
          className='rounded-full group-hover:bg-white'
        />
      </button>
    </>
  )
}
