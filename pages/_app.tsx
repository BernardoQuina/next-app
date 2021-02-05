import '../styles/globals.css'
import Layout from '../components/Layout'

interface AppProps {
  Component: any
  pageProps: any
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
