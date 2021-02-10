import Link from 'next/link'

interface PostItemProps {
  post: {
    id: string
    title: string
    body: string
    published: boolean
    userId: string
    author: {
      name: string
    }
  }
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <Link href={`/post/${post.id}`}>
      <a className='border border-white p-4 rounded-md shadow-md hover:border-pink-600 hover:text-pink-600 transform active:scale-95'>
        <h3 className='text-lg font-bold'>{post.title}</h3>
        <div className='flex text-sm text-gray-400 mb-4'>
          <span>posted by</span>
          <strong className='pl-2'>{post.author.name}</strong>
        </div>
        <p>{post.body}</p>
      </a>
    </Link>
  )
}

export default PostItem
