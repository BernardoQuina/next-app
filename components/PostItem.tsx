import Link from 'next/link'
import { DateTime } from 'luxon'
import { motion, Variants } from 'framer-motion'

import { PostSnippetFragment } from '../generated/graphql'
import { EditPostButton } from './EditPostButton'

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
        className='border border-white p-4 rounded-md shadow-md hover:border-pink-600 hover:text-pink-600'
      >
        <div className='flex'>
          <h3 className='text-lg font-bold'>{post.title}</h3>
          {post.published === false && (
            <p className='max-w-min max-h-7 text-sm font-bold text-pink-600 rounded-md ml-auto px-2 py-1 bg-pink-200'>
              private
            </p>
          )}
        </div>
        <div className='flex text-sm text-gray-400 mb-4'>
          <span>posted by</span>
          <strong className='pl-2 pr-2'>{post.author?.name}</strong>
          <p>|</p>
          <p className='pl-2'>
            {DateTime.fromISO(post.createdAt).setLocale('en').toRelative()}
          </p>
        </div>
        <div className='flex'>
          <p>{post.textSnippet}</p>
          <EditPostButton postId={post.id!} authorId={post.author?.id!} />
        </div>
      </motion.a>
    </Link>
  )
}

const fadeInUp: Variants = {
  initial: {
    y: 60,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}
