import { Meta } from './Meta'
import { Nav } from './Nav'

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Meta />
      <Nav />
      <div className='md:mx-auto md:w-full px-4 flex justify-center'>
        <main className='mt-14 pt-10 w-full'>{children}</main>
      </div>
    </div>
  )
}
