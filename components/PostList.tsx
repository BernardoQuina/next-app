import { motion } from 'framer-motion'

import { PostSnippetFragment } from '../generated/graphql'
import { PostItem } from './PostItem'
import { stagger } from '../utils/animations'

interface PostListProps {
  posts: PostSnippetFragment[]
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <motion.div
      variants={stagger}
      className='my-10 grid grid-cols-1 gap-6 max-w-lg mx-auto'
    >
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </motion.div>
  )
}

