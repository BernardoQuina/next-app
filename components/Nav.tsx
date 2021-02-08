import Link from 'next/link'

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  return (
    <nav className='bg-black text-white flex justify-center p-3'>
      <ul className='flex w-full 2xl:w-8/12'>
        <li className='mx-4'>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/about'>About</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
