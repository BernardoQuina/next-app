interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <>
      <h1 className='text-center text-5xl font-bold pt-6 pb-5'>
        Posts from <span className='text-pink-600 font-extrabold'>GraphQL</span>
      </h1>
      <p className='text-center text-lg font-semibold'>
        These posts where fetched from a prisma 2.0 nexus backend
      </p>
    </>
  )
}

export default Header
