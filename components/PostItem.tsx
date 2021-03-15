import Link from 'next/link'
import { Image, Placeholder } from 'cloudinary-react'
import { DateTime } from 'luxon'
import { motion } from 'framer-motion'

import { PostSnippetFragment } from '../generated/graphql'
import { EditPostButton } from './EditPostButton'
import { fadeInUp } from '../utils/animations'

interface PostItemProps {
  post: PostSnippetFragment
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <Link key={post.id} href={`/post/${post.id}`} passHref>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'just' }}
        variants={fadeInUp}
        className='border border-white py-4 px-2 rounded-md shadow-md hover:border-pink-600 hover:text-pink-600'
      >
        <div className='flex'>
          <div className='pr-4'>
            {post.author?.photo ? (
              <div className='w-max mx-auto'>
                <Image
                  className='rounded-full'
                  src={post.author.photo}
                  height={50}
                  width={50}
                />
              </div>
            ) : (
              <div className='w-max mx-auto'>
                <Image
                  className='rounded-full'
                  src='/avatar.jpg'
                  height={50}
                  width={50}
                />
              </div>
            )}
          </div>
          <div className='w-full'>
            <div className='flex'>
              <div className='flex text-sm text-gray-400'>
                <strong className='md:pr-2'>{post.author?.name}</strong>
                <p className='hidden md:inline-block'>|</p>
                <p className='pl-2'>
                  {DateTime.fromISO(post.createdAt)
                    .setLocale('en')
                    .toRelative()}
                </p>
              </div>
              {post.published === false && (
                <p className='max-w-min max-h-7 text-sm font-bold text-pink-600 rounded-md ml-auto px-2 py-1 bg-pink-200'>
                  private
                </p>
              )}
            <EditPostButton postId={post.id!} authorId={post.author?.id!} />
            </div>
            <h3 className='text-lg font-bold'>{post.title}</h3>
            {post.images.length > 0 && (
                    <div className='flex'>
                      <ul className='my-4 flex mx-auto'>
                        {post.images.map((image) => (
                          <li key={image} className='mx-1 rounded-xl'>
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
            <p>{post.textSnippet}</p>
          </div>
        </div>
      </motion.a>
    </Link>
  )
}
