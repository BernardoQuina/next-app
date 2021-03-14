import NextLink from 'next/link'

import { useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { Edit } from './svg/Edit'

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
        <button type='button' className='focus:outline-none'>
          <Edit tailwind='h-6 p-1 rounded-lg bg-pink-200 fill-current text-pink-600 transform hover:scale-110' />
        </button>
      </NextLink>
    </div>
  )
}
