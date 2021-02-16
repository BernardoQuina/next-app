import NextLink from 'next/link'

import { useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'

interface EditPostButtonProps {
  postId: string
  authorId: string
}

export const EditPostButton: React.FC<EditPostButtonProps> = ({
  postId,
  authorId,
}) => {
  const { data } = useMeQuery({ skip: isServer() })

  if (data?.me?.id !== authorId) {
    return null
  }

  return (
    <div className='ml-auto'>
      <NextLink href={`/post/edit/${postId}`}>
        <button type='button'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-8 p-1 rounded-lg bg-pink-200 fill-current text-pink-600 transform hover:scale-110'
          >
            <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
          </svg>
        </button>
      </NextLink>
    </div>
  )
}
