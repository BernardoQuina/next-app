import { CommentFragment } from '../generated/graphql'
import { CommentItem } from './CommentItem'
import { motion, AnimatePresence } from 'framer-motion'
interface CommentListProps {
  comments: CommentFragment[]
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <motion.div
      key={comments[0].postId}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{ duration: 0.5 }}
      className='px-4 mt-5 divide-y divide-pink-400 border shadow-inner rounded-md'
    >
      <AnimatePresence initial={false}>
        {comments
          .slice() // unfreeze
          .sort((a, b) => {
            const c = new Date(a.createdAt)
            const d = new Date(b.createdAt)

            return c < d ? 1 : -1
          })
          .map((comment) => (
            <motion.div
              key={comment.id}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{ type: 'just' }}
              variants={{
                initial: {
                  opacity: 0,
                  x: 200,
                  y: -200,
                  width: '50%',
                  height: '0px',
                },
                animate: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  width: '100%',
                  height: '100%',
                },
                exit: {
                  opacity: 0,
                  x: 600,
                  width: '50%',
                  height: '0px',
                },
              }}
            >
              <CommentItem comment={comment} />
            </motion.div>
          ))}
      </AnimatePresence>
    </motion.div>
  )
}
