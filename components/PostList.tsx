import { PostSnippetFragment } from '../generated/graphql'
import PostItem from './PostItem'

interface PostListProps {
  posts: PostSnippetFragment[]
}

const PostList: React.FC<PostListProps> = ({ posts }) => {

  
  return (
    <div className='my-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl'>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  )
}

export default PostList
