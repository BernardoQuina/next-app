import { Meta } from './Meta'
import { Nav } from './Nav'

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav />
      <div className='md:mx-auto md:w-full px-4 flex justify-center'>
        <main className='pt-10 md:w-full'>{children}</main>
      </div>
    </>
  )
}
