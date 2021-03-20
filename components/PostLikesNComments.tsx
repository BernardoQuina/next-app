import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useMeQuery, useLikePostMutation } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { Comment } from './svg/Comment'
import { Heart } from './svg/Heart'

interface PostLikesNCommentsProps {
  postId: string
  postLikeCount: any
  postCommentCount?: number | null
  showCommentModal: boolean
  setShowCommentModal: Dispatch<SetStateAction<boolean>>
}

export const PostLikesNComments: React.FC<PostLikesNCommentsProps> = ({
  postId,
  postLikeCount,
  postCommentCount,
  showCommentModal,
  setShowCommentModal,
}) => {
  const { data: meData, refetch: refetchMe } = useMeQuery({
    errorPolicy: 'all',
    skip: isServer(),
  })

  const [ILikeIt, setILikeIt] = useState<boolean>()

  const [likePost] = useLikePostMutation()

  useEffect(() => {
    if (
      meData?.me?.likes.some((like) => like.postId === postId && like.active)
    ) {
      setILikeIt(true)
    } else {
      setILikeIt(false)
    }
  }, [meData])

  return (
    <div className='flex'>
      <button
        type='button'
        className='flex mt-2 focus:outline-none group transform active:scale-90'
        onClick={async (e) => {
          e.preventDefault()
          e.stopPropagation()
          await likePost({
            variables: { postId },
            update: (cache, { data }) => {
              cache.modify({
                id: 'Post:' + postId,
                fields: {
                  likeCount() {
                    if (data?.likePost?.active) {
                      return postLikeCount + 1
                    } else {
                      return postLikeCount - 1
                    }
                  },
                },
              })
            },
          })

          await refetchMe()
        }}
      >
        <Heart
          tailwind={
            ILikeIt
              ? 'h-6 text-pink-600 fill-current transform group-hover:scale-110'
              : 'h-6 text-gray-500 transform group-hover:scale-110'
          }
          strokeWidth={1.5}
        />
        <p className={ILikeIt ? 'ml-1 text-pink-600' : 'ml-1 text-gray-500'}>
          {postLikeCount}
        </p>
      </button>
      <button
        type='button'
        className='flex ml-10 mt-2 focus:outline-none group transform active:scale-90'
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setShowCommentModal(!showCommentModal)
        }}
      >
        <Comment
          tailwind='h-6 text-gray-500 transform group-hover:scale-110'
          strokeWidth={1.5}
        />
        <p className='ml-1 text-gray-500'>{postCommentCount}</p>
      </button>
    </div>
  )
}
