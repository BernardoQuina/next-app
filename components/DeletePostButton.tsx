import { useRouter } from 'next/router'

import { useDeletePostMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'

interface DeletePostButtonProps {
  postId: string
  authorId: string
}

export const DeletePostButton: React.FC<DeletePostButtonProps> = ({
  postId,
  authorId,
}) => {
  const router = useRouter()

  const { data } = useMeQuery({ skip: isServer() })

  const [deletePost] = useDeletePostMutation()

  if (data?.me?.id !== authorId) {
    return null
  }

  return (
    <button
      type='button'
      onClick={async () => {
        const response = await deletePost({
          variables: { postId },
          update: (cache) => {
            cache.evict({ fieldName: 'posts' })
            cache.evict({fieldName: 'myPosts'})
          },
        })

        if (response.errors) {
          console.log(response.errors)
        } else if (response.data?.deletePost) {
          router.push('/')
        }
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        stroke='currentColor'
        fill='none'
        className='w-6 p-1 rounded-lg bg-red-100 stroke-current text-red-600 transform hover:scale-110'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
        />
      </svg>
    </button>
  )
}
