import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import { motion } from 'framer-motion'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <motion.div
      key={router.route}
      initial={router.pathname === '/' ? 'homeInitial' : 'pageInitial'}
      animate={router.pathname === '/' ? 'goHome' : 'pageAnimate'}
      transition={{duration: 0.6}}
      variants={{
        homeInitial: {
          opacity: 0.7,
          x: -1000
        },
        pageInitial: {
          opacity: 0,
          scale: 0.5
        },
        goHome: {
          opacity: 1,
          x: 0
        },
        pageAnimate: {
          opacity: 1,
          width: '100%',
          scale: 1
        }
      }}
    >
      <Component {...pageProps} />
    </motion.div>
  )
}

export default MyApp
