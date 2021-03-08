import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'
import { motion, Variants } from 'framer-motion'

import { withApollo } from '../../lib/apollo'
import { Meta } from '../../components/Meta'
import { SinglePostQuery, useSinglePostQuery } from '../../generated/graphql'
import { Layout } from '../../components/Layout'
import { DeletePostButton } from '../../components/DeletePostButton'
import { EditPostButton } from '../../components/EditPostButton'
import { CommentList } from '../../components/CommentList'
import { NewCommentForm } from '../../components/NewCommentForm'

interface PostProps {}

const Post: NextPage<PostProps> = () => {
  const router = useRouter()

  const id = router.query.id as string

  const { data, loading } = useSinglePostQuery({
    variables: { postId: id },
  })


  return (
    <motion.div
      initial='hidden'
      animate='active'
      exit='exit'
      transition={{ duration: 0.3 }}
      variants={variants}
    >
      <Layout>
        <div className='block max-w-lg m-auto'>
          <Meta
            title={data?.post?.title as string}
            description={data?.post?.body as string}
          />
          <div className='mt-10 px-6 pt-6 pb-6 border shadow-inner rounded-lg'>
            {loading || !data?.post ? (
              <>
                <div className='mb-4 h-6 w-3/4 rounded-lg text-2xl  md:text-3xl font-bold bg-pink-300 animate-pulse'></div>
                <div className='mb-4 h-5 w-2/4 rounded-lg text-2xl  md:text-3xl font-bold bg-pink-300 animate-pulse'></div>
                <div className='mb-2 h-4 w-full rounded-md text-2xl  md:text-3xl font-bold bg-pink-300 animate-pulse'></div>
                <div className='h-4 w-2/3 rounded-md text-2xl  md:text-3xl font-bold bg-pink-300 animate-pulse'></div>
              </>
            ) : (
              <>
                <div className='mb-7 items-baseline'>
                  {data?.post.published === false && (
                    <p className='max-w-min text-sm font-bold text-pink-600 rounded-md ml-auto px-2 py-1 bg-pink-200 mb-2'>
                      private
                    </p>
                  )}
                  <h1 className='text-2xl md:test-3xl font-bold'>
                    {data?.post.title}
                  </h1>
                  <div className='md:flex text-gray-400'>
                    <div className='flex'>
                      <p>posted by</p>
                      <p className='ml-2 mr-2 font-semibold'>
                        {data?.post.author?.name}
                      </p>
                    </div>
                    <p className='hidden md:inline-block'>|</p>
                    <p className='md:ml-2'>
                      {DateTime.fromISO(data?.post.createdAt)
                        .setLocale('en')
                        .toRelative()}
                    </p>
                  </div>
                  <p className='mt-4'>{data?.post.body}</p>
                </div>
                <div className='flex mt-6'>
                  <DeletePostButton
                    postId={id}
                    authorId={data?.post.author?.id!}
                  />
                  <EditPostButton
                    authorId={data?.post.author?.id!}
                    postId={id}
                  />
                </div>
              </>
            )}
          </div>
          <NewCommentForm postId={id} />
          {data?.post && data?.post.comments.length ? (
            <CommentList comments={data?.post.comments} />
          ) : (
            <br />
          )}

          <button
            className='flex mt-8 mx-auto py-2 px-4 rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900 mb-8'
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </Layout>
    </motion.div>
  )
}

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  active: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

export default withApollo({ ssr: true })(Post)
