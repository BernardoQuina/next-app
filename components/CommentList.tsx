import { CommentFragment } from '../generated/graphql'
import { CommentItem } from './CommentItem'

interface CommentListProps {
  comments: CommentFragment[]
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className='px-8 divide-y divide-pink-400 border shadow-inner rounded-md'>
            {comments.map((comment) => (
              <div className='py-5'>
                <CommentItem comment={comment} key={comment.id} />
              </div>
            ))}
          </div>
  )
}
