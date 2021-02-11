import Link from 'next/link'

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
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
      <ul className='flex'>
        <li className='border mx-4 border-black hover:border-white rounded-md p-1 px-2'>
          <Link href='/login'>Login</Link>
        </li>
        <li className='border mr-4 border-black hover:border-white rounded-md p-1 px-2'>
          <Link href='/register'>Register</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
