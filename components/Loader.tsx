import { motion } from 'framer-motion'
import { loader } from '../utils/animations'

interface LoaderProps {}

export const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <>
      <motion.div
        animate='animationOne'
        variants={loader}
        className='w-3 h-3 mt-20 mb-10 mx-auto rounded-full bg-pink-500'
      />
    </>
  )
}
