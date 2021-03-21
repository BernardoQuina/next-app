import { useRouter } from 'next/router'

import { useDeletePostMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { Delete } from './svg/Delete'

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
      className='focus:outline-none'
      type='button'
      onClick={async () => {
        const deleteConfirmed = window.confirm(
          'Are you sure you want to delete this post?'
        )
        if (deleteConfirmed) {
          const response = await deletePost({
            variables: { postId },
            update: (cache) => {
              cache.evict({ fieldName: 'posts' })
              cache.evict({ fieldName: 'myPosts' })
            },
          })

          if (response.errors) {
            console.log(response.errors)
          } else if (response.data?.deletePost) {
            router.push('/')
          }
        }
      }}
    >
      <Delete
        tailwind='w-6 p-1 rounded-lg bg-red-100 stroke-current text-red-600 transform hover:scale-110'
        strokeWidth={2}
      />
    </button>
  )
}
