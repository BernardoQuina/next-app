import { CommentFragment } from '../generated/graphql'
import { CommentItem } from './CommentItem'
import { useTransition, animated } from 'react-spring'
import { CSSProperties } from 'react'
interface CommentListProps {
  comments: CommentFragment[]
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const transition = useTransition<CommentFragment, CSSProperties>(
    comments,
    (comment) => comment.id!,
    {
      from: {
        opacity: 0,
        marginLeft: 200,
        marginTop: -100,
        width: '50%',
      },
      enter: {
        opacity: 1,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        width: '100%',
      },
      leave: {
        opacity: 0,
        marginLeft: 200,
        marginTop: -150,
        width: '50%',
      },
      initial: { opacity: 1, marginLeft: 0, marginRight: 0 },
    }
  )

  return (
    <div className='px-8 divide-y divide-pink-400 border shadow-inner rounded-md py-5 '>
      {transition
        .slice() // unfreeze
        .sort((a, b) => {
          const c = new Date(a.item.createdAt)
          const d = new Date(b.item.createdAt)

          return c < d ? 1 : -1
        })
        .map(({ item: comment, key, props }) => (
          <animated.div key={key} style={props}>
            <CommentItem comment={comment} key={comment.id} />
          </animated.div>
        ))}
    </div>
  )
}
