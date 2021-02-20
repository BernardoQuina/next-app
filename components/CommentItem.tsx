import { CommentFragment } from '../generated/graphql'

interface CommentItemProps {
  comment: CommentFragment
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className='py-5'>
    <div className='text-lg font-semibold'>
      {comment.author?.name}
    </div>
    <div className='ml-4 mt-2'>{comment.text}</div>
  </div>
  )
}