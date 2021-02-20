import { CommentFragment } from '../generated/graphql'
import { CommentItem } from './CommentItem'

interface CommentListProps {
  comments: CommentFragment[]
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className='ml-6 divide-y divide-pink-400'>
            {comments.map((comment) => (
              <div className='py-5'>
                <CommentItem comment={comment} />
              </div>
            ))}
          </div>
  )
}
