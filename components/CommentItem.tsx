import { CommentFragment } from '../generated/graphql'

interface CommentItemProps {
  comment: CommentFragment
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className='flex'>
      <div>
        <div className='text-lg font-semibold'>{comment.author?.name}</div>
        <div className='ml-4 mt-2'>{comment.text}</div>
      </div>
      <div className='ml-auto'>
        <div className='mb-4'>
          <button type='button'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-6 p-1 rounded-md bg-pink-200 fill-current text-pink-600 transform hover:scale-110'
            >
              <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
            </svg>
          </button>
        </div>
        <div>
          <button
            type='button'
            // onClick={async () => {
            //   const response = await deletePost({
            //     variables: { postId },
            //     update: (cache) => {
            //       cache.evict({ fieldName: 'posts' })
            //       cache.evict({fieldName: 'myPosts'})
            //     },
            //   })

            //   if (response.errors) {
            //     console.log(response.errors)
            //   } else if (response.data?.deletePost) {
            //     router.push('/')
            //   }
            // }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              stroke='currentColor'
              fill='none'
              className='justify-self-end w-6 p-1 rounded-lg bg-red-100 stroke-current text-red-600 transform hover:scale-110'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
