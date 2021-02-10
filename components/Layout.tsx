import Meta from './Meta'
import Nav from './Nav'
import Header from './Header'

interface LayoutProps {

}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
    <Meta />
    <Nav />
    <div className='md:container md:mx-auto px-4 flex justify-center'>
      <main className='pt-10'>
        <Header />
        {children}
      </main>
    </div>
    </>
  )
}

export default Layout
