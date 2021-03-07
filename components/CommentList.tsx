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
      initial={{ opacity: 0, height: '0px', width: '80%' }}
      animate={{
        opacity: 1,
        height: '100%',
        width: '100%',
      }}
      className='px-8 divide-y divide-pink-400 border shadow-inner rounded-md py-5 '
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
              exit='exit'
              initial='hidden'
              animate='visible'
              transition={{ type: 'just' }}
              variants={{
                hidden: {
                  opacity: 0,
                  x: 200,
                  y: -200,
                  width: '50%',
                  height: '0px',
                },
                visible: {
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
