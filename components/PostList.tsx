import { motion } from 'framer-motion'

import { PostSnippetFragment } from '../generated/graphql'
import { PostItem } from './PostItem'
import { stagger } from '../utils/animations'

interface PostListProps {
  posts: PostSnippetFragment[]
  lastPostRef?: any
}

export const PostList: React.FC<PostListProps> = ({ posts, lastPostRef }) => {
  return (
    <motion.div
      variants={stagger}
      className='my-10 grid grid-cols-1 gap-6 max-w-lg mx-auto'
    >
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return <PostItem lastPostRef={lastPostRef} post={post} key={post.id} />
        } else {
          return <PostItem post={post} key={post.id} />
        }
      })}
    </motion.div>
  )
}
