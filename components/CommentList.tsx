import { CommentFragment } from '../generated/graphql'
import { CommentItem } from './CommentItem'

interface CommentListProps {
  comments: CommentFragment[]
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className='px-8 divide-y divide-pink-400 border shadow-inner rounded-md py-5 '>
      {comments
        .slice() // unfreeze
        .sort((a, b) => {
          const c = new Date(a.createdAt)
          const d = new Date(b.createdAt)

          return c < d ? 1 : -1
        })
        .map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
    </div>
  )
}
