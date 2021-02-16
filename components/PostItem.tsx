import Link from 'next/link'
import { PostSnippetFragment } from '../generated/graphql'
import { styles } from '../tailwind/styles'
import { EditPostButton } from './EditPostButton'

interface PostItemProps {
  post: PostSnippetFragment
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <Link href={`/post/${post.id}`}>
      <a className='border border-white p-4 rounded-md shadow-md hover:border-pink-600 hover:text-pink-600 transform active:scale-95'>
        <div className='flex'>
          <h3 className='text-lg font-bold'>{post.title}</h3>
          {post.published === false && <p className={styles.flag}>private</p>}
        </div>
        <div className='flex text-sm text-gray-400 mb-4'>
          <span>posted by</span>
          <strong className='pl-2'>{post.author?.name}</strong>
        </div>
        <div className='flex'>
          <p>{post.textSnippet}</p>
          <EditPostButton postId={post.id!} authorId={post.author?.id!} />
        </div>
      </a>
    </Link>
  )
}
