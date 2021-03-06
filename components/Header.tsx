import { motion } from 'framer-motion'

interface HeaderProps {
  title?: string
  body?: string
}

export const Header: React.FC<HeaderProps> = ({ title, body }) => {
  return (
    <>
      <motion.div
        initial='hidden'
        animate='visible'
        variants={{
          hidden: {
            scale: 0.8,
            opacity: 0,
          },
          visible: {
            scale: [.9, 1.1, 1],
            opacity: 1,
            transition: { delay: 0.2 },
          },
        }}
      >
        {title ? (
          <h1 className='max-w-max mx-auto text-pink-600 text-center text-5xl font-bold pt-6 pb-5'>
            {title}
          </h1>
        ) : (
          <h1 className='text-center text-5xl font-bold pt-6 pb-5'>
            Posts from{' '}
            <span className='text-pink-600 font-extrabold'>GraphQL</span>
          </h1>
        )}
      </motion.div>

      {body ? (
        <p className='text-center text-lg font-semibold'>{body}</p>
      ) : (
        <p className='text-center text-lg font-semibold'>
          These posts where fetched from a prisma 2.0 nexus backend
        </p>
      )}
    </>
  )
}
