import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import { useTransition, animated } from 'react-spring'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const transitions = useTransition(router, (router) => router.pathname, {
    from: { opacity: 0, transform: 'scale(2)' },
    enter: { opacity: 1, transform: ' scale(1)' },
    leave: {
      opacity: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
  })

  return (
    <>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Component location={item} {...pageProps} />
        </animated.div>
      ))}
    </>
  )
}

export default MyApp
