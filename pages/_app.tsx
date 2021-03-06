import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import { useTransition, animated } from 'react-spring'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const transitions = useTransition(router, (router) => router.pathname, {
    from: { opacity: 0, transform: 'scale(1.5)' },
    enter: { opacity: 1, transform: ' scale(1)' },
    leave: { display: 'none' },
    initial: { opacity: 0 },
    config: { mass: 1, tension: 500, friction: 100, clamp: true },
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
