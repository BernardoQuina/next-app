import { motion, Variants } from 'framer-motion'

import { PostSnippetFragment } from '../generated/graphql'
import { PostItem } from './PostItem'

interface PostListProps {
  posts: PostSnippetFragment[]
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <motion.div
      variants={stagger}
      className='my-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto'
    >
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </motion.div>
  )
}

const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}
