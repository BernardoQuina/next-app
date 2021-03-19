import { ApolloQueryResult } from '@apollo/client'
import React, { useEffect, useState } from 'react'

import {
  useMeQuery,
  useLikePostMutation,
  Exact,
  Maybe,
  SinglePostQuery,
} from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { Heart } from './svg/Heart'

interface PostLikesNCommentsProps {
  postId: string
  postLikeCount: any
  refetch: (
    variables?:
      | Partial<
          Exact<{
            postId?: Maybe<string> | undefined
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<SinglePostQuery>>
}

export const PostLikesNComments: React.FC<PostLikesNCommentsProps> = ({
  postId,
  postLikeCount,
  refetch,
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
    console.log('current state', ILikeIt)
  }, [meData])

  return (
    <div>
      <button
        className='flex focus:outline-none group transform active:scale-90'
        onClick={async () => {
          const response = await likePost({
            variables: { postId },
            update: (cache) => {
              cache.evict({ fieldName: 'posts' })
              cache.evict({ fieldName: 'myPosts' })
            },
          })

          await refetch() // updates posts likes
          await refetchMe()
          console.log('state on like: ', ILikeIt)
          console.log('response: ', response)
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
        <p className={ILikeIt ? 'text-pink-600' : 'text-gray-500'}>
          {postLikeCount}
        </p>
      </button>
    </div>
  )
}
