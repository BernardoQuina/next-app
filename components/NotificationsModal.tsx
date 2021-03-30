import { AnimatePresence, motion } from 'framer-motion'


interface NotificationsModalProps {
  showModal: boolean
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({  showModal }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div className='absolute mt-2 -ml-52 h-20 w-60 rounded-md shadow-lg bg-white'>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NotificationsModal
