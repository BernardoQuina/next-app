import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
// import { ApolloProvider } from '@apollo/client'

// import { useApollo } from '../apollo'

import Layout from '../components/Layout'

const MyApp = ({ Component, pageProps }: AppProps) => {
  // const client = useApollo(pageProps.initialApolloState)
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
