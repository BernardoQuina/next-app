import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'

import Layout from '../components/Layout'
import { ApolloProvider } from '@apollo/client'
import { createApolloClient } from '../lib/apollo'

const MyApp = ({ Component, pageProps }: AppProps) => {

  const client = createApolloClient()

  return (
    <ApolloProvider client={client}>
      <Layout>
      <Component {...pageProps} />
    </Layout>
    </ApolloProvider>
    
  )
}

export default MyApp
