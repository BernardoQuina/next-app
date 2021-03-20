import { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'
import { motion } from 'framer-motion'
import { Image, Placeholder } from 'cloudinary-react'

import { withApollo } from '../../lib/apollo'
import { Meta } from '../../components/Meta'
import { useSinglePostQuery } from '../../generated/graphql'
import { Layout } from '../../components/Layout'
import { DeletePostButton } from '../../components/DeletePostButton'
import { EditPostButton } from '../../components/EditPostButton'
import { CommentList } from '../../components/CommentList'
import { variants } from '../../utils/animations'
import { PostPlaceholder } from '../../components/PostPlaceholder'
import { Avatar } from '../../components/Avatar'
import { PostLikesNComments } from '../../components/PostLikesNComments'
import { NewCommentModal } from '../../components/NewCommentModal'

interface PostProps {}

const Post: NextPage<PostProps> = () => {
  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const id = router.query.id as string

  const { data, loading } = useSinglePostQuery({
    variables: { postId: id },
  })

  return (
    <motion.div
      initial='initial'
      animate='animate'
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
              <PostPlaceholder />
            ) : (
              <>
                <div className='mb-4 items-baseline'>
                  {data?.post.published === false && (
                    <p className='max-w-min text-sm font-bold text-pink-600 rounded-md ml-auto px-2 py-1 bg-pink-200 mb-2'>
                      private
                    </p>
                  )}
                  <div className='mb-4 flex text-gray-400'>
                    <div className='flex'>
                      <Avatar user={data.post.author!} height={50} />
                      <div className='md:flex md:mt-2'>
                        <p className='mx-2 font-semibold text-black'>
                          {data?.post.author?.name}
                        </p>
                        <p className='hidden md:inline-block'>|</p>
                        <p className='ml-2'>
                          {DateTime.fromISO(data?.post.createdAt)
                            .setLocale('en')
                            .toRelative()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <h1 className='text-2xl md:test-3xl font-bold'>
                    {data?.post.title}
                  </h1>
                  {data.post.images.length > 0 && (
                    <div className='flex'>
                      <ul className='my-4 flex mx-auto'>
                        {data.post.images.map((image) => (
                          <li className='mx-1 rounded-xl' key={image}>
                            <Image
                              className='rounded-lg max-h-200'
                              cloudName={
                                process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                              }
                              publicId={image}
                              loading='lazy'
                              dpr='auto'
                              crop='fill'
                            >
                              <Placeholder type='vectorize'></Placeholder>
                            </Image>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <p className='mt-2'>{data?.post.body}</p>
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
                <PostLikesNComments
                  postId={id}
                  postLikeCount={data.post.likeCount}
                  postCommentCount={data.post.commentCount}
                  setShowCommentModal={setShowModal}
                  showCommentModal={showModal}
                />
              </>
            )}
          </div>
          <NewCommentModal
            postId={id}
            showModal={showModal}
            setShowModal={setShowModal}
          />
          {data?.post && data?.post.comments.length ? (
            <CommentList comments={data?.post.comments} />
          ) : (
            <br />
          )}

          <button
            className='flex mt-8 mx-auto py-2 px-4 rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900 mb-8 focus:outline-none'
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </Layout>
    </motion.div>
  )
}

export default withApollo({ ssr: true })(Post)
