import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import { AnimatePresence } from 'framer-motion'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  )
}

export default MyApp
