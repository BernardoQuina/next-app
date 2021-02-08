import PostItem from './PostItem'

interface PostListProps {
  posts: {
    id: string
    title: string
    body: string
    published: boolean
    userId: string
    author: {
      name: string
    }
  }[]
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className='my-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl'>
      {posts.map(post => (
        <PostItem post={post} key={post.id}/>
      ))}
    </div>
  )
}

export default PostList
